import { Component } from '@angular/core';
import { GameCanvasComponent } from './game/components/game-canvas/game-canvas.component';


export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
