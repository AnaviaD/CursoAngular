import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {}
