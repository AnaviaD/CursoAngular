import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchImput } from "../../components/search-imput/search-imput";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'by-country-page',
  imports: [SearchImput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {}
