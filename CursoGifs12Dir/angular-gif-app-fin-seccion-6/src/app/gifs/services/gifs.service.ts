import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { myGif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/gifMapper.mapper';
import { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])


  constructor() {
    this.loadTrendingGifs()
  }


  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = GifMapper.mapGiphyItemsToMyGifArray(resp.data)
      console.log(gifs)
      this.trendingGifs.set(gifs)
    })
  }

}
