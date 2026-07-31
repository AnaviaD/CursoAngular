import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { myGif } from '../../interfaces/myGif.interface';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifs = signal<myGif[]>([])
  gifServis = inject(GifService)

  searchGifByName(query: string){
    this.gifServis.searchGifsByName(query).subscribe((gifsitos) => {
      this.gifs.set(gifsitos)
    })
  }

}
