import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.iterface';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/GiphyRes.interface';
import { GifMapper } from '../Mappers/gifMapper.mapper';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])
  searchHistory = signal<Record<string, myGif[]>>({})
  searchHistoryKeys = computed(() =>{
    return Object.keys(this.searchHistory())
  })

  constructor() {
    this.loadingTrendingGifs()
  }

  loadingTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = GifMapper.giphyArrayToGifArray(resp.data)
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map((resp) => resp),
      map((items) => GifMapper.giphyArrayToGifArray(items.data)),
      tap(items =>{
        this.searchHistory.update( history =>({
          ...history,
          [query.toLocaleLowerCase()]: items
        }))
      })
    )
  }
}
