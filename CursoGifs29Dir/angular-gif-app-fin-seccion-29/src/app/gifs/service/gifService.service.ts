import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { environment } from '@environments/environment';
import { giphyMapper } from '../Mapper/gifMapper.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '[]'
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs
}

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])
  private http = inject(HttpClient)

  searchHistory = signal<Record<string, myGif[]>>(loadFromLocalStorage())
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
  }

  saveGifsToLocalStorage = effect(() =>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString)
  })

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) => {
      const gifs = giphyMapper.giphyArrayToGif(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string):Observable<myGif[]>{
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,
        q: query
      }
    }).pipe(
      map((items) => giphyMapper.giphyArrayToGif(items.data)),
      tap((items) => {
        this.searchHistory.update((history) =>({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query: string): myGif[]{
    return this.searchHistory()[query] ?? []
  }

}
