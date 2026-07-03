import { Injectable, signal } from '@angular/core';
import { Subject, Observable, timer, retry, takeUntil, share } from 'rxjs';
import { ServerMessage, ClientMessage } from '../models/ws-messages';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

@Injectable({providedIn: 'root'})
export class WebsocketService {
  private ws: WebSocket | null = null;
  private url = 'ws://localhost:3000/ws'; // Ajusta a tu endpoint
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 2000; // 2 segundos base
  private destroy$ = new Subject<void>();
  private messageSubject = new Subject<ServerMessage>();

  // Estado reactivo expuesto
  readonly status = signal<ConnectionStatus>('disconnected');
  readonly playerId = signal<string | null>(null);
  readonly connectedPlayers = signal<number>(0);

  // Observable público de mensajes
  readonly messages$: Observable<ServerMessage> = this.messageSubject.asObservable().pipe(share());

  constructor() {
    // Intentar reconexión al perder conexión
    this.setupReconnection();
  }

  /**
   * Inicia la conexión WebSocket
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.warn('WebSocket ya está conectado');
      return;
    }

    this.status.set('connecting');

    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('Error al crear WebSocket:', error);
      this.status.set('disconnected');
    }
  }

  /**
   * Envía un mensaje al servidor
   */
  send(message: ClientMessage): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket no está conectado');
      return false;
    }

    try {
      this.ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      return false;
    }
  }

  /**
   * Cierra la conexión limpiamente
   */
  disconnect(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.ws) {
      this.ws.close(1000, 'Cliente cerrando conexión');
      this.ws = null;
    }

    this.status.set('disconnected');
    this.playerId.set(null);
  }

  /**
   * Verifica si está conectado
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // ─── INTERNAL METHODS ──────────────────────

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('✅ WebSocket conectado');
      this.status.set('connected');
      this.reconnectAttempts = 0;

      // Enviar autenticación si tienes token
      const token = localStorage.getItem('ws_token');
      if (token) {
        this.send({ type: 'auth', token });
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const message: ServerMessage = JSON.parse(event.data);
        this.handleMessage(message);
        this.messageSubject.next(message);
      } catch (error) {
        console.error('Error parseando mensaje:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.ws.onclose = (event) => {
      console.log(`WebSocket cerrado: ${event.code} - ${event.reason}`);

      if (event.code !== 1000) {
        // No fue cierre limpio, intentar reconectar
        this.status.set('reconnecting');
      } else {
        this.status.set('disconnected');
        this.playerId.set(null);
      }
    };
  }

  private handleMessage(message: ServerMessage): void {
    switch (message.type) {
      case 'auth_ok':
        this.playerId.set(message.playerId);
        console.log('Autenticado como:', message.playerId);
        break;

      case 'auth_error':
        console.error('Error de autenticación:', message.reason);
        this.disconnect();
        break;

      case 'player_joined':
        this.connectedPlayers.update(n => n + 1);
        break;

      case 'player_left':
        this.connectedPlayers.update(n => Math.max(0, n - 1));
        break;

      case 'pong':
        // Para medir latencia
        const latency = Date.now() - message.timestamp;
        console.debug('Latencia:', latency, 'ms');
        break;

      case 'world_state':
        this.connectedPlayers.set(message.players.length);
        break;

      default:
        console.debug('Mensaje recibido:', message);
    }
  }

  private setupReconnection(): void {
    timer(this.reconnectDelay)
      .pipe(
        takeUntil(this.destroy$),
        retry({
          delay: (error, retryCount) => {
            this.reconnectAttempts = retryCount;
            if (retryCount >= this.maxReconnectAttempts) {
              console.error('Máximos intentos de reconexión alcanzados');
              this.status.set('disconnected');
              throw error;
            }

            const delay = Math.min(
              this.reconnectDelay * Math.pow(2, retryCount), // Backoff exponencial
              30000 // Máximo 30 segundos
            );
            console.log(`Reintentando conexión en ${delay/1000}s (intento ${retryCount + 1}/${this.maxReconnectAttempts})`);
            return timer(delay);
          }
        })
      )
      .subscribe({
        next: () => {
          console.log('Reconectando...');
          this.connect();
        }
      });
  }

}
