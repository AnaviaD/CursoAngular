import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { giphyItem, GiphyResponse } from '../interfaces/giphyResponse.interface';
import { myGif } from '../interfaces/myGif.interface';
import { GiphyToGif } from '../Mappers/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = GiphyToGif.giphyArrayToGifArray(resp.data)
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }
}
