import {  Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GiphyService } from '../../services/giphyService';
import { Gif } from '../../interfaces/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifService = inject(GiphyService);
  gifs = signal<Gif[]>([])

  onSearch(query:string){
    this.gifService.searchGifs(query).subscribe((data) => {
      this.gifs.set(data)
    })
  }
}
