import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifService } from '../../service/gifService.service';
import { myGif } from '../../interfaces/myGif.interface';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifServis = inject(GifService)
  gifsBySearch = signal<myGif[]>([])

  gifSearchByName(query: string){
    this.gifServis.searchGifsByName(query).subscribe((items) => this.gifsBySearch.set(items))
  }
}
