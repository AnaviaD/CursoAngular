import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();


  public caracter: Character ={
    name: '',
    power: 0
  }

  emitCharacter():void
  {
    // debugger;
    console.log(this.caracter);

    if (  this.caracter.name.length === 0) return;

    this.onNewCharacter.emit(this.caracter);

    //Si igualamos los valores de character esto trae problemas
    this.caracter = {name: '', power: 0};
  }
}
