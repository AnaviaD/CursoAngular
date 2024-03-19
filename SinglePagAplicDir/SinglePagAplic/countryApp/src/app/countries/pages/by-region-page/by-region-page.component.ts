import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countriesFromRegion: Country[] = [];

  constructor(private countriServis: CountriesService){}

  searchByRegion(  term:string ):void{
    this.countriServis.searchRegion(term)
    .subscribe(countries => {
      this.countriesFromRegion = countries
    });
  }
}
