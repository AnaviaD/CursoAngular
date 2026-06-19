import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({providedIn: 'root'})
export class GifService {
  
  trendingGifs = signal<myGif[]>([]);
  private http = inject(HttpClient)

  constructor() { 
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get(`${environment.urlApi}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((resp) => console.log(resp))
  }
  
}