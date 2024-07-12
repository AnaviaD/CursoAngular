import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  @Input()
  public characterListComponent: Character[] = [];

  @Output()
  onDeleteEvent: EventEmitter<number> = new EventEmitter();

  onDeleteCharacter(index   :number):void {
    console.log(index);
    this.onDeleteEvent.emit(index);
  }
}
