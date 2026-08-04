import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { myGif } from '../interface/myGif.interface';

@Injectable({providedIn: 'root'})
export class GifService {
  constructor() { }

  private http = inject(HttpClient)
  trendingGifs = signal<myGif[]>([])
}
