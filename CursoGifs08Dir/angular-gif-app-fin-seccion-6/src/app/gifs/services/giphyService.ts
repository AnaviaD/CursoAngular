import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {

  private http = inject(HttpClient)
  env = environment
  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true)

  constructor(){
    this.LoadTrendingGifs()
  }

  LoadTrendingGifs(){
    this.http.get<GiphyResponse>(`${ this.env.giphyUrl}/gifs/trending`,{
      params:{
        api_key: this.env.giphyApiKey,
        limit: 20
      },
    })
    .subscribe((resp) =>{
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }

}
