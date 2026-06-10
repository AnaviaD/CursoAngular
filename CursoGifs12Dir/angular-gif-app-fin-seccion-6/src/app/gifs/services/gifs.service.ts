import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs()
  }


  loadTrendingGifs(){
    this.http.get(`${environment.urlApi}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    })
  }

}
