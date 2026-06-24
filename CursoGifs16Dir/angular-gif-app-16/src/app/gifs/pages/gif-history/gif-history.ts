import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory {

  query = toSignal(
    inject(ActivatedRoute).params
  )

}
