import {  Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  GifServis = inject(GifService)

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])))

  gifsByKey = computed(() =>{
    return this.GifServis.getHistoryGifs(this.query())
  })
}
