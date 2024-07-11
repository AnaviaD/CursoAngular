import { Component, ElementRef, ViewChild } from '@angular/core';

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

  constructor() {

  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    console.log(newTag);
  }
}
