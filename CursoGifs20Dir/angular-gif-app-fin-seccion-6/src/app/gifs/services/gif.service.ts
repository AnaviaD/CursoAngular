import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { environment } from '@environments/environment';
import { GiffMapper } from '../Mappers/GifMapper';

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
        limit: 20
      }
    }).subscribe((data) =>{
      const gifs = GiffMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    })
  }

}
