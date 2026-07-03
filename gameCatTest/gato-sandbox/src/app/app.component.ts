import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameCanvasComponent } from "./game/components/game-canvas/game-canvas.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gato-sandbox';
}
