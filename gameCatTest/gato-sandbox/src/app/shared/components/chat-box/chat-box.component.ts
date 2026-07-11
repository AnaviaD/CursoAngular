import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../core/services/websocket.service';

@Component({
  selector: 'app-chat-box',
  imports: [],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages = signal<Array<{ sender: string; text: string; mine: boolean }>>([]);
  newMessage = '';
  private messageSub?: Subscription;

  constructor(public ws: WebsocketService) {}

  ngOnInit(): void {
    // Escuchar mensajes de chat del WebSocket
    this.messageSub = this.ws.messages$.subscribe(msg => {
      if (msg.type === 'chat') {
        this.messages.update(list => [
          ...list,
          {
            sender: msg.playerName || 'Anónimo',
            text: msg.message || '',
            mine: msg.playerId === this.ws.myId()
          }
        ]);
        this.scrollToBottom();
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const text = this.newMessage.trim();
    if (!text) return;

    this.ws.sendMessage(text);

    // Mostrar localmente también
    this.messages.update(list => [
      ...list,
      { sender: 'Yo', text, mine: true }
    ]);

    this.newMessage = '';
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }

}
