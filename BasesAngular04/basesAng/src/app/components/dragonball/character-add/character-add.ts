import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.html',
})
export class CharacterAddComponent {
  name = signal('Gohan');
  power = signal(100);

  newCharacter = output<Character>();

  addCharacter(){
      if(!this.name() || !this.power() || this.power() <= 0)
      {
        return;
      }

      const newCharacter: Character = {
        id: Math.floor(Math.random() *1000),
        name: this.name(),
        power: this.power()
      }

      console.log(newCharacter)
      this.newCharacter.emit(newCharacter);

      this.resetFields()
    }

    resetFields()
    {
      this.name.set('');
      this.power.set(0)

    }
}
