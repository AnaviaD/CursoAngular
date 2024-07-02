import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input()
  public characterList: Character[] = [];

  @Output()
  public onDeleteCharIndex: EventEmitter<number> = new EventEmitter();

  onDeleteCharacter(index:number):void
  {
    this.onDeleteCharIndex.emit(index);
  }

  // onDelete

}
