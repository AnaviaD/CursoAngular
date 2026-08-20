import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { myGif } from '../../interface/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsBySearch = signal<myGif[]>([])

  searchGifsByName(query: string) {
  }
}
