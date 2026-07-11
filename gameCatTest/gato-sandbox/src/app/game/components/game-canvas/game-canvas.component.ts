import { Component } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { ChatBoxComponent } from "../../../shared/components/chat-box/chat-box.component";

@Component({
  selector: 'app-game-canvas',
  imports: [ChatBoxComponent],
  templateUrl: './game-canvas.component.html',
  styleUrl: './game-canvas.component.scss'
})
export class GameCanvasComponent {
  private keysPressed = new Set<string>();
  showChat = false;
  constructor(public ws: WebsocketService) {}

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  ngOnInit(): void {
    // Conectar al servidor
    this.ws.connect();

    // Escuchar teclas para movimiento
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    // Loop de movimiento (envía 10 veces por segundo)
    this.startMoveLoop();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.ws.disconnect();
  }

  // ─── Movimiento con WASD ────────────────

  private onKeyDown = (e: KeyboardEvent): void => {
    this.keysPressed.add(e.key.toLowerCase());
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keysPressed.delete(e.key.toLowerCase());
  };

  private startMoveLoop(): void {
    setInterval(() => {
      if (!this.ws.connected()) return;

      let dx = 0;
      let dz = 0;

      if (this.keysPressed.has('w') || this.keysPressed.has('arrowup')) dz -= 0.5;
      if (this.keysPressed.has('s') || this.keysPressed.has('arrowdown')) dz += 0.5;
      if (this.keysPressed.has('a') || this.keysPressed.has('arrowleft')) dx -= 0.5;
      if (this.keysPressed.has('d') || this.keysPressed.has('arrowright')) dx += 0.5;

      if (dx !== 0 || dz !== 0) {
        this.ws.sendMove(dx, dz);
      }
    }, 100); // 10 veces por segundo
  }
}
