import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { myGif } from '../interfaces/myGif.interface';
import { giphyMapper } from '../mappers/giphyMapper.mapper';
import { GiphyResponse } from '../interfaces/giphyGif.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

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
      const gifs = giphyMapper.giphyArrayToFigArray(resp.data)
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }

}
