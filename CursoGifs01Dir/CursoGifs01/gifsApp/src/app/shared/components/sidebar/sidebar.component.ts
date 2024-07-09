import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsServ: GifsService){
  }

  searchTagFunc(tag:string): void{
    this.gifsServ.searchTag(tag);
  }

  get tags():string[]{
    return this.gifsServ.tagsHistory;
  }


}
