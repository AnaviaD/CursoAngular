import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gof.mapper.';
import { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true)

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        }
      }).subscribe((resp)=>{
        const gifs = GifMapper.mapGiphyItemToGifArray(resp.data)
        this.trendingGifs.set(gifs)
        this.trendingGifsLoading.set(false)
        console.log({gifs})
      });
  }

  searchGifs(query:string){

  }
}
