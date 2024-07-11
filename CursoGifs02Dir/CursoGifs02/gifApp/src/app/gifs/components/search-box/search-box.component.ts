import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar: </h5>
  <input type="text"
  (keyup.enter)="searchTag()"
  class="form-control"
  placeholder="Buscar gifs..."
  #txtTagInput
  >
  `,
})
export class SearchBoxComponent {

  constructor(private gifServis: GifsService) {

  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {

    const newTag = this.tagInput.nativeElement.value;

    this.gifServis.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
    // console.log(newTag);
  }
}
