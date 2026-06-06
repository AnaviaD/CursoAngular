import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { myGif } from '../interfaces/myGif.interfaces';
import { GifMapper } from '../mapper/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);
  trendingGif = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyArrayToGifArray(resp.data);
      this.trendingGif.set(gifs)
      console.log(gifs)
    })
  }

  searchGifs(query: string){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).subscribe((resp) => {

      console.log(resp)
    })
  }

}
