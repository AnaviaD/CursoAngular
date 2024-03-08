import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-lilst',
  templateUrl: './card-lilst.component.html',
})
export class CardLilstComponent {

  @Input()
  public gifs: Gif[] = [];

}
