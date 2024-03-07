import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'hIPm7c4DiN6VaMfwszx68EnDBxu3RMND';

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(  tag: string ) {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

  }
}
