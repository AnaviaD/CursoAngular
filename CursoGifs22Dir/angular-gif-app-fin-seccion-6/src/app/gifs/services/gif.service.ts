import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { environment } from '@environments/environment';
import { giphyToGif } from '../Mapper/giphyToGif.mapper';
import { GiphyResponse } from '../interface/giphyResponse.interface';

@Injectable({providedIn: 'root'})
export class GifService {
  constructor() {
    this.loadTrendingGifs()
  }

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gif/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) =>{
      const gifs = giphyToGif.giphyToGifArray(items.data)
      this.trendingGifs.set(gifs)
    })
  }


}
