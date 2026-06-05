import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { myGif } from '../interfaces/myGif.interface';
import { gifMapper } from '../mappers/gifMapper.mapper';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  env = environment
  trendingGifs = signal<myGif[]>([])
  trendingGifsLoading = signal(true)

  searchHistory = signal<Record<string, myGif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

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

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${this.env.urlApi}/gifs/search`,{
      params:{
        api_key: this.env.giphyApiKey,
        limit: 20,
        q:query
      },
    }).pipe(
      map(({data}) => data),
      map((items) => gifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleUpperCase()]:items,
        }))
      })
    );
  }

}
