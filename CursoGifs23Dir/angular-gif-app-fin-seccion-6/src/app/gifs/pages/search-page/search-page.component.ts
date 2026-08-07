import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../service/gifService.service';
import { myGif } from '../../Interface/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifServis = inject(GifService)
  searchGifs = signal<myGif[]>([])

  gifBySearch(query: string){
    this.gifServis.searchGifsByName(query).subscribe((items) => this.searchGifs.set(items))

  }
}
