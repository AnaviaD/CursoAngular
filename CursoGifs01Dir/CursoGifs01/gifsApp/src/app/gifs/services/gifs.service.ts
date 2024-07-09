import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  constructor(private http: HttpClient) { }

  public gifList            : Gif[] = [];
  private _tagsHistory      : string[] = [];
  private apiKey            : string = 'hIPm7c4DiN6VaMfwszx68EnDBxu3RMND';
  private serviceUrl        : string = 'https://api.giphy.com/v1/gifs';


  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string):void {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params: params})
    .subscribe((resp) => {

      this.gifList = resp.data;

      console.log({ gifs: this.gifList });
    })

    // const resp = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=hIPm7c4DiN6VaMfwszx68EnDBxu3RMND')
    // .then( resp => resp.json())
    // .then( data => console.log(data));

  }

}
