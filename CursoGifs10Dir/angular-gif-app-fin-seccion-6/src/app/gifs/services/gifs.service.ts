import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { myGif } from '../interfaces/myGif.interface';
import { gifMapper } from '../mappers/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  env = environment
  trendingGifs = signal<myGif[]>([])
  trendingGifsLoading = signal(true)

  constructor() {
    this.loadTrendingGifs()
    console.log("Servicio creado")
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${this.env.urlApi}/gifs/trending`,{
      params:{
        api_key: this.env.giphyApiKey,
        limit: 20
      },
    }).subscribe((resp) =>{
      const gifs = gifMapper.mapGiphyItemsToGifArray(resp.data)
      console.log(gifs)
      this.trendingGifs.set(gifs)
    })
  }

}
