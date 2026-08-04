import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { environment } from '@environments/environment';
import { giphyToGif } from '../Mapper/giphyToGif.mapper';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {
  constructor() {
    this.loadTrendingGifs()
  }

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) =>{
      const gifs = giphyToGif.giphyToGifArray(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 10
      }
    }).pipe(
      map((items) => giphyToGif.giphyToGifArray(items.data))
    )
  }
}
