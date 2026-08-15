import { inject, Injectable, signal } from '@angular/core';
import { myGifs } from '../interface/myGifs.interface';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { environment } from '@environments/environment';
import { gifMapper } from '../Mapper/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGifs[]>([])
  private http = inject(HttpClient)

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
      const gift  = gifMapper.GiphytoGifArray(items.data)
      this.trendingGifs.set(gift)
    })
  }

}
