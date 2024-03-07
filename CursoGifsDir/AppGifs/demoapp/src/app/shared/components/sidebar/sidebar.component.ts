import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private _sideBarTagHistory: string[] = [];

  constructor( private gifServis: GifService){}

  get tags(){
    return this.gifServis.tagsHistory;
  }
}
