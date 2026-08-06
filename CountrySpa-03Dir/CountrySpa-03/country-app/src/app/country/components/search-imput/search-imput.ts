import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-imput',
  imports: [],
  templateUrl: './search-imput.html',
})
export class SearchImput {

  placeholder = input('Buscar')
  value = output<string>()

}
