import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { environment } from '@environments/environment';
import { GiffMapper } from '../Mapper/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])
  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) =>{
      const gifs = GiffMapper.giphyToGifArray(items.data)
      this.trendingGifs.set(gifs)
    })
  }

}
