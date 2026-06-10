import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)
  // trendingGifs = signal<>

  constructor() {
    this.loadTrendingGifs()
    console.log("Serivicio creado")
  }

  loadTrendingGifs(){

    this.http.get(`${environment.urlApi}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) =>{
      console.log(resp)
    })
  }

}
