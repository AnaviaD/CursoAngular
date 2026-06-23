import { computed, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { giphyToGifMapper } from '../Mapper/gifMapper.mapper';
import { GiphyResponse } from '../interfaces/giphyResponse.interface';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([]);
  private http = inject(HttpClient)

  searchHistory = signal<Record<string, myGif[]>>({})
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((resp) => {
      const gif = giphyToGifMapper.giphyArrayToGifArray(resp.data)
      this.trendingGifs.set(gif)
      console.log(gif)
    })
  }

  saerchingGifs(query:  string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 10,
        q: query
      }
    }).pipe(
      map((items) => giphyToGifMapper.giphyArrayToGifArray(items.data)),
      tap(items =>{
        this.searchHistory.update(history =>({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
    )
  }

  getHistoryGifs(query:string){
    return this.searchHistory()[query] ?? [];
  }

}
