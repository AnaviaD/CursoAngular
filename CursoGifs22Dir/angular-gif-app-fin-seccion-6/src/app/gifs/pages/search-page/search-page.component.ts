import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { myGif } from '../../interface/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  gifServis = inject(GifService)
  searchGifs = signal<myGif[]>([])

  searchGifsQuery(query: string){
    this.gifServis.searchGifs(query).subscribe((items) => this.searchGifs.set(items))
  }
}
