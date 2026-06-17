import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.iterface';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/GiphyRes.interface';
import { GifMapper } from '../Mappers/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = GifMapper.giphyArrayToGifArray(resp.data)
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }
}
