import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList            : Gif[] = [];

  private _tagsHistoy       : string[] = [];
  private apiKey            : string = 'hIPm7c4DiN6VaMfwszx68EnDBxu3RMND';
  private serviceUrl        : string = 'https://api.giphy.com/v1/gifs';


  constructor(private httpClien: HttpClient) { }

  get tagsHistory():string[] {
    return [...this._tagsHistoy];
  }

  private organizeHistory(tag:string) {

    tag = tag.toLowerCase();


    if(this._tagsHistoy.includes(tag)){
      this._tagsHistoy = this._tagsHistoy.filter( (oldTag) => oldTag !== tag );
    }

    if (this._tagsHistoy.length > 9)
      this._tagsHistoy.pop();

    this._tagsHistoy.unshift( tag );
  }

  searchTag(tag:string){

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag)


    this.httpClien.get<SearchResponse>(`${this.serviceUrl}/search`, {params: params})
      .subscribe( res => {
        this.gifList = res.data;
        console.log(  this.gifList );
      });

  }
}
