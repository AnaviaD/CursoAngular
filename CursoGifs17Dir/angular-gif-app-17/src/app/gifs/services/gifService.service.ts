import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { gifMapper } from '../mappers/gifMapper.mapper';
import { GiphyResponse } from '../interfaces/giphyResponse.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])
  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = gifMapper.giphyArrayToGifArray(resp.data)
      console.log(resp)
      this.trendingGifs.set(gifs)
    })
  }

}
