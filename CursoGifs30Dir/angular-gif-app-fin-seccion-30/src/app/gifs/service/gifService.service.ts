import { computed, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { gifMapper } from '../Mappers/gifMapper.mapper';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { map, Observable, pipe, tap } from 'rxjs';

const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '[]'
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs
}

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])
  private http = inject(HttpClient)

  serachHistory = signal<Record<string, myGif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.serachHistory()))

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
      const gifs = gifMapper.giphyArrayToGif(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string):Observable<myGif[]>{
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 10,
        q: query
      }
    }).pipe(
      map((items) => gifMapper.giphyArrayToGif(items.data)),
      tap((items) => {
        this.serachHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

}
