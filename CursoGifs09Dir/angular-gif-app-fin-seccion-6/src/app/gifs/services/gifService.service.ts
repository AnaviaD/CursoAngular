import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/gifMapper.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  constructor() {
    this.LoadTrendingGifs()
  }

  env = environment
  private http = inject(HttpClient)
  trendingGifs = signal<Gif[]>([]);
  trendingLoading = signal(true)

  LoadTrendingGifs(){
    this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key: this.env.giphyApiKey,
          limit: 20
        }
      }
    ).subscribe((resp) => {
      const gif = GifMapper.mapGiphyToGifArray(resp.data)
      this.trendingGifs.set(gif)
      this.trendingLoading.set(false)
      console.log(gif)

    })
  }

}
