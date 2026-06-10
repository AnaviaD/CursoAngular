import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { myGif } from '../../interfaces/myGif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsServ = inject(GifService)
  searchGifs = signal<myGif[]>([])

  onSearch(query:string){
    this.gifsServ.searchGifs(query).subscribe((resp) => {
      this.searchGifs.set(resp)
    })

  }
}
