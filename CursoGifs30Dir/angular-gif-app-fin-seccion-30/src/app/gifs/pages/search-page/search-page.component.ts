import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { myGif } from '../../interface/myGif.interface';
import { GifService } from '../../service/gifService.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsBySearch = signal<myGif[]>([])
  gifServis = inject(GifService)

  searchGifsByName(query: string) {
    this.gifServis.searchGifsByName(query).subscribe((items) => this.gifsBySearch.set(items))
  }
}
