import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { myGif } from '../interfaces/myGif.interface';
import { GifMapper } from '../mapper/gifMapper.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])

  constructor() {
    this.loadTrendingGifs()
    console.log("Serivicio creado")
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      const gifs = GifMapper.giphyArrayToMyGifArray(resp.data)
      this.trendingGifs.set(gifs)
      console.log(gifs)
    })
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.urlApi}/gifs/search`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.giphyArrayToMyGifArray(items))
    )
  }

}
