import { Component, computed, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";

interface Character{
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super-page',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.html',
  styleUrl: './dragonball-super-page.css'
})
export class DragonballSuperPageComponent {

  name = signal('')
  power = signal(0)

  characters  = signal<Character[]>([
    {id: 1, name:'Goku', power: 9001},
    {id: 2, name:'Vegeta', power: 8000},
    {id: 3, name:'Piccolo', power: 3000},
    {id: 4, name:'Yamcha', power: 500},
  ]);

  addCharacter() {
    if(!this.name() || !this.power() || this.power() < 0)
    {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update((list) => [... list, newCharacter])

    console.log(this.name(), this.power())

    this.resetFields()
  }

  resetFields() {
    this.name.set('');
    this.power.set(100);
  }

}
