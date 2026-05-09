import { Component, computed, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent],
  templateUrl: './dragonball-super.component.html',
})
export class DragonballSuperPageComponent {

  name = signal('Gohan');
  power = signal(100);


  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power:9001},
    { id: 2, name: 'Vegeta', power:8000},
    { id: 3, name: 'Piccolo', power:3000},
    { id: 4, name: 'Yamcha', power:300},
  ]);

  powerClasses = computed(() =>{
    return{
      'text-danger': true
    }
  })

  addCharacter(){
    if(!this.name() || !this.power() || this.power() <= 0)
    {
      return;
    }

    const newCharacter: Character = {
      id: this.characters.length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(
      (list) => [... list, newCharacter]
    );


    console.log(`${this.name()} - ${this.power()}`)

    this.resetFields()
  }

  resetFields()
  {
    this.name.set('');
    this.power.set(0)

  }
}
