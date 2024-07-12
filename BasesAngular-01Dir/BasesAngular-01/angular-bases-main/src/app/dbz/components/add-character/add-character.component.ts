import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-add-character',
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter:EventEmitter<Character> = new EventEmitter();

  public character    :Character = {
    name  : '',
    power : 0,
  };

  public emitCharacter(characterObj :Character):void {

    if (characterObj.name.length === 0) return;

    this.onNewCharacter.emit({...characterObj});

    this.character.name = '';
    this.character.power = 0;

  }

}
