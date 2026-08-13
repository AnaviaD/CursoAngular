import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interface/giphyResponse.interface';
import { environment } from '@environments/environment';
import { giphyMapper } from '../Mapper/giphyMapper.mapper';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<myGif[]>([])
  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) =>{
      const gifs = giphyMapper.giphyArrayToGif(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string):Observable<myGif[]>{
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,
        q:query
      }
    }).pipe(
      map((items) => giphyMapper.giphyArrayToGif(items.data))
    )
  }

}
