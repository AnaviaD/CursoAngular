import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { environment } from '@environments/environment';
import { giphyToGif } from '../Mapper/giphyToGif.mapper';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { map, tap } from 'rxjs';

const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '[]'
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs
}


@Injectable({providedIn: 'root'})
export class GifService {
  constructor() {
    this.loadTrendingGifs()
  }

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  trendingGifsLoading = signal(true)
  searchHistory = signal<Record<string, myGif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))


  saveGifsToLocalStorage = effect(() =>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString)
  })

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
      map((items) => giphyToGif.giphyToGifArray(items.data)),
      tap(items =>{
        this.searchHistory.update(history => ({
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
