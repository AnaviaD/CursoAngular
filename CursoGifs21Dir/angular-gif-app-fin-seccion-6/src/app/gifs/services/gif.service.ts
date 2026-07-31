import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { environment } from '@environments/environment';
import { gifMapper } from '../Mappers/gifMapper.mapper';
import { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((data) =>{
      const gifs = gifMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    })
  }
}
