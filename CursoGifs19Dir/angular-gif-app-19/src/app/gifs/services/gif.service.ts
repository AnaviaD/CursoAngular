import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { myGif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/GifMapperGiphy';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
    console.log("se inicio el servicio ")
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '25',
      }
    }).subscribe((data) =>{
      const gifs = GifMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    });
  }


}
