import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { GiphyResponse } from '../interfaces/giphyResponse.interface';
import { giphyMapper } from '../Mappers/giphyMapper.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '[]'
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  searchHistory = signal<Record<string, myGif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
  }

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
    }).subscribe((data) =>{
      const gifs = giphyMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string):Observable<myGif[]>{
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 10
      }
    }).pipe(
      map((items) => giphyMapper.giphyArrayToGifArray(items.data)),
      tap((items) => {
        this.searchHistory.update(history =>({
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
