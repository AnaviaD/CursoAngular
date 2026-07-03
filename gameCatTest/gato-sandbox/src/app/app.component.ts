import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameCanvasComponent } from "./game/components/game-canvas/game-canvas.component";
import { HudComponent } from "./game/components/hud/hud.component";
import { MainMenuComponent } from "./game/components/main-menu/main-menu.component";
import { PauseMenuComponent } from "./game/components/pause-menu/pause-menu.component";


export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

@Component({
  selector: 'app-root',
  imports: [GameCanvasComponent, HudComponent, MainMenuComponent, PauseMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gato-sandbox';

  gameState = signal<GameState>('menu');

  onStartGame(): void {
    this.gameState.set('playing');
  }

  onPause(): void {
    this.gameState.set('paused');
  }

  onResume(): void {
    this.gameState.set('playing');
  }

  onQuit(): void {
    this.gameState.set('menu');
  }

  onGameOver(): void {
    this.gameState.set('gameover');
  }

}
