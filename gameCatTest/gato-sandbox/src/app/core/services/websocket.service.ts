import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
}

interface ServerMessage {
  type: string;
  playerId?: string;
  player?: Player;
  players?: Player[];
  position?: { x: number; y: number; z: number };
  playerName?: string;
  message?: string;
  timestamp?: number;
}

@Injectable({providedIn: 'root'})
export class WebsocketService {
  private ws: WebSocket | null = null;

  // Estado reactivo simple
  readonly connected = signal(false);
  readonly myId = signal<string>('');
  readonly myName = signal<string>('');
  readonly players = signal<Player[]>([]);
  readonly playerCount = signal(0);

  // Subject para mensajes (por si quieres suscribirte en componentes)
  readonly messages$ = new Subject<ServerMessage>();

  // URL de tu servidor (ajústala si es necesario)
  private url = 'ws://34.195.140.148:3000/ws';

  /**
   * Conecta al servidor WebSocket
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('⚠️ Ya está conectado');
      return;
    }

    console.log(`🔌 Conectando a ${this.url}...`);

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('✅ Conectado al servidor');
        this.connected.set(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const data: ServerMessage = JSON.parse(event.data);
          this.handleMessage(data);
          this.messages$.next(data);
        } catch (e) {
          console.error('Error parseando mensaje:', e);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ Error WebSocket:', error);
      };

      this.ws.onclose = () => {
        console.log('🔌 Desconectado del servidor');
        this.connected.set(false);

        // Reconexión simple después de 3 segundos
        setTimeout(() => {
          if (!this.connected()) {
            console.log('🔄 Intentando reconectar...');
            this.connect();
          }
        }, 3000);
      };

    } catch (error) {
      console.error('Error creando WebSocket:', error);
    }
  }

  /**
   * Procesa los mensajes del servidor según su tipo
   */
  private handleMessage(data: ServerMessage): void {
    console.log('📩 Mensaje recibido:', data.type, data);

    switch (data.type) {
      case 'init':
        // El servidor nos envía nuestro ID y la lista de jugadores
        this.myId.set(data.playerId || '');
        this.myName.set(data.player?.name || '');
        this.players.set(data.players || []);
        this.playerCount.set(data.players?.length || 0);
        console.log(`👤 Yo soy: ${data.player?.name} (${data.playerId})`);
        console.log(`👥 Jugadores en sala: ${data.players?.length}`);
        break;

      case 'playerJoined':
        // Alguien nuevo entró
        if (data.player) {
          this.players.update(list => [...list, data.player!]);
          this.playerCount.update(n => n + 1);
        }
        break;

      case 'playerLeft':
        // Alguien se fue
        this.players.update(list => list.filter(p => p.id !== data.playerId));
        this.playerCount.update(n => Math.max(0, n - 1));
        break;

      case 'playerUpdate':
        // Alguien se movió
        this.players.update(list =>
          list.map(p => {
            if (p.id === data.playerId && data.position) {
              return { ...p, x: data.position.x, y: data.position.y, z: data.position.z };
            }
            return p;
          })
        );
        break;

      case 'chat':
        console.log(`💬 [${data.playerName}]: ${data.message}`);
        break;

      case 'pong':
        const latency = Date.now() - (data.timestamp || 0);
        console.log(`🏓 Latencia: ${latency}ms`);
        break;
    }
  }

  /**
   * Envía movimiento al servidor
   */
  sendMove(dx: number, dz: number): void {
    if (!this.connected() || !this.ws) return;

    this.ws.send(JSON.stringify({
      type: 'move',
      position: { x: dx, z: dz }
    }));
  }

  /**
   * Envía mensaje de chat (útil para pruebas)
   */
  sendMessage(text: string): void {
    if (!this.connected() || !this.ws) return;

    this.ws.send(JSON.stringify({
      type: 'message',
      message: text
    }));
  }

  /**
   * Envía ping para probar latencia
   */
  sendPing(): void {
    if (!this.connected() || !this.ws) return;

    this.ws.send(JSON.stringify({
      type: 'ping'
    }));
  }

  /**
   * Cierra la conexión
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.connected.set(false);
    }
  }
}
