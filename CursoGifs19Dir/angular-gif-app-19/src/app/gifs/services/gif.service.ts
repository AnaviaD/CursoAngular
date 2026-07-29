import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { myGif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/GifMapperGiphy';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<myGif[]>([])
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, myGif[]>>({})
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
    console.log("se inicio el servicio ")
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '25',
      }
    }).subscribe((data) =>{
      const gifs = GifMapper.giphyArrayToGifArray(data.data)
      this.trendingGifs.set(gifs)
    });
  }

  searchGifs(query:string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        q:query,
      }
    })
    .pipe(
      map((items) => GifMapper.giphyArrayToGifArray(items.data))
    );
  }

}
