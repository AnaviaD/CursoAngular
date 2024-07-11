import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsServis: GifsService) {
  }

  get tagsList():string[] {
    return this.gifsServis.tagsHistory;
  }

  public searchAgain(tag:string):void {
    this.gifsServis.searchTag(tag);
  }

}
