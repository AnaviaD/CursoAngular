import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countriesFromCountry: Country[] = [];

  constructor(private countriServis: CountriesService){}

  searchByCountry(  term:string ):void{
    this.countriServis.searchCountry(term)
    .subscribe(countries => {
      this.countriesFromCountry = countries
    });
  }

}
