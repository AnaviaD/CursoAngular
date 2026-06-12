import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { myGif } from '../../interfaces/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifServis = inject(GifService)
  searchGifs = signal<myGif[]>([])

  onSearch(query:string){
    this.gifServis.searchingGifs(query).subscribe((resp) =>{
      this.searchGifs.set(resp)
    })
  }

}
