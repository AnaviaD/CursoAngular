import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifService.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { myGif } from '../../interfaces/myGif.iterface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifServis = inject(GifService)
  searchGifs = signal<myGif[]>([])

  onSearch(query: string){
    this.gifServis.searchGifs(query).subscribe((resp) => this.searchGifs.set(resp))
  }

}
