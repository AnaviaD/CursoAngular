import { Component } from '@angular/core';
import { SearchImput } from "../../components/search-imput/search-imput";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'by-capital-page',
  imports: [SearchImput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  onSearch(query: string){
    console.log(query)
  }
}
