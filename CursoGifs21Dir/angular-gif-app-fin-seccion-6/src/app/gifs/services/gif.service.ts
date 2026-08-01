import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { environment } from '@environments/environment';
import { gifMapper } from '../Mappers/gifMapper.mapper';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  searchHistory = signal<Record<string, myGif[]>>({})
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((data) =>{
      const gifs = gifMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,
        q: query
      }
    }).pipe(
      map((items) => gifMapper.giphyArrayToGifArray(items.data)),
      tap((items) => {
        this.searchHistory.update((history) =>({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }
}
