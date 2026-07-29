import { Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])

  constructor() { }

  loadTrendingGifs(){

  }

}
