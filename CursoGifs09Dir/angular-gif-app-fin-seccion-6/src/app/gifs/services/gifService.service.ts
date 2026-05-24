import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {

  constructor() {
    this.LoadTrendingGifs()
  }

  private http = inject(HttpClient)
  env = environment

  LoadTrendingGifs(){
    this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key: this.env.giphyApiKey,
          limit: 20
        }
      }
    ).subscribe((resp) => {
      console.log(resp)
    })
  }

}
