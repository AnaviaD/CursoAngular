import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gifs.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Gifs {

  env = environment
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() =>Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/trending`, {
      params: {
        api_key: this.env.giphyApiKey,
        limit: 20,
      }
    }).subscribe( (resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false)
      console.log(gifs);
    });
  }


  searchGifs(query:string){
    return this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/search`, {
      params: {
        api_key: this.env.giphyApiKey,
        limit: 20,
        q:query,
      }
    })
    .pipe(
      map(  ({data})  => data),
      map(  (items)   =>  GifMapper.mapGiphyItemsToGifArray(items)),
      tap(  items =>{
        this.searchHistory.update(history =>({
          ...history,
          [query.toLocaleUpperCase()]: items,
        }))
      })
    );
  }
}
