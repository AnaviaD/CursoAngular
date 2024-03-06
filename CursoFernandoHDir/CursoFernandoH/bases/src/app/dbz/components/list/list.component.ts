import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class DbzListComponent {

  @Input()
  public characterList: Character[] = [{
    name:'Trunks',
    power: 10
  }]

  @Output()
  onDelete:EventEmitter<number> = new EventEmitter();

  onDeleteCharacter(indice: number):void{
    this.onDelete.emit( indice  );
  }
}
