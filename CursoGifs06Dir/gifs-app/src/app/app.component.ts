import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "./gifs/components/side-menu/side-menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifs-app';
}
