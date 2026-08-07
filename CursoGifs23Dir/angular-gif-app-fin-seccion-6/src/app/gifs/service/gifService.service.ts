import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../Interface/myGif.interface';
import { environment } from '@environments/environment';
import { giphyMapper } from '../Mappers/giphyMapper.mapper';
import { GiphyResponse } from '../Interface/GiphyResponse.interface';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])
  trendingGifsLoading = signal(true)

  searchHistory = signal<Record<string, myGif[]>>({})
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) => {
      const gifs = giphyMapper.GiphyArrayToGifArray(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query:string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 10
      }
    }).pipe(
      map((items) => giphyMapper.GiphyArrayToGifArray(items.data)),
      tap((items) => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }))
      })
    )
  }

}
