import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { GifMapper } from '../Mapper/GifMapper.mapper';
import { GiphyResponse } from '../interface/GiphyResponse.interface';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http =inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10
      }
    }).subscribe((items) => {
      const gifs = GifMapper.arrayGiphyToGif(items.data)
      this.trendingGifs.set(gifs)
    })
  }

  searchGifsByName(query: string): Observable<myGif[]>{
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,
        q: query
      }
    }).pipe(
      map((items) => GifMapper.arrayGiphyToGif(items.data))
    )
  }


}
