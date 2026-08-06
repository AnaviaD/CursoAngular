import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../Interface/myGif.interface';
import { environment } from '@environments/environment';
import { giphyMapper } from '../Mappers/giphyMapper.mapper';
import { GiphyResponse } from '../Interface/GiphyResponse.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) => {
      const gifs = giphyMapper.GiphyArrayToGifArray(items.data)
      this.trendingGifs.set(gifs)
    })
  }

}
