import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interfaces/myGif.interface';
import { GiphyResponse } from '../interfaces/giphyResponse.interface';
import { giphyMapper } from '../Mappers/giphyMapper.mapper';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
  }

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
      map((items) => giphyMapper.giphyArrayToGifArray(items.data))
    )
  }

}
