import {  Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { myGif } from '../../interfaces/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  searchGifs = signal<myGif[]>([]);
  gifServ = inject(GifService)

  onSearch(query: string){
    this.gifServ.searchGifs(query).subscribe((resp) => {
      this.searchGifs.set(resp)
    })
  }
}
