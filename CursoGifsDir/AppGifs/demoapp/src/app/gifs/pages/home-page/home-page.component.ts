import { Component } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private gifServis: GifService){

  }

  get gifList(): Gif[]{
    return this.gifServis.gifList;
  }

}
