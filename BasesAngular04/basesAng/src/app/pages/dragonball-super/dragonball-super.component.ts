import { Component, computed, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list';
import { Character } from '../../interfaces/character.interface';
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add";

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super.component.html',
})
export class DragonballSuperPageComponent {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power:9001},
    { id: 2, name: 'Vegeta', power:8000},
    { id: 3, name: 'Piccolo', power:3000},
    { id: 4, name: 'Yamcha', power:300},
  ]);

  addCharacter(character: Character){
    console.log('llego aqui')
    this.characters.update((list) => [... list, character]);
  }

}
