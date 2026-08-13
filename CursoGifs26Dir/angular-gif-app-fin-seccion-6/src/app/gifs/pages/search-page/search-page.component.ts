import { Component, inject, signal } from '@angular/core';
import { GifService } from '../../service/gifService.service';
import { myGif } from '../../interface/myGif.interface';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifsBySearch = signal<myGif[]>([])
  gifServis = inject(GifService)

  searchGifsByName(query: string){
    this.gifServis.searchGifsByName(query).subscribe((items) => {
      console.log(items)
      this.gifsBySearch.set(items)
    })
  }
}
