import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifService } from '../../service/gifService.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory {

  gifServis = inject(GifService)

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])))

  gifsByKey = computed(() =>{
    return this.gifServis.getHistoryGifs(this.query())
  })
}
