import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  ngOnInit(): void {
    if (!this.url) throw new Error('Url property is required')
  }

  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public hasLoaded: boolean = false;

  onLoad(): void {
    console.log('Image loaded');
    this.hasLoaded = true;
  }
}
