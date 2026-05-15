import { Component } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  onSearch(query: string){
    console.log({query})
  }

}
