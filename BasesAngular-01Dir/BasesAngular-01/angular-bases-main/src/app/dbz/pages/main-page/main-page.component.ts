import { Component } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {

  public characters_list: Character[] = [
    {
      name: 'Krilin',
      power: 150,
    },
    {
      name: 'Goku',
      power: 950,
    },
    {
      name: 'Vegeta',
      power: 450,
    }
  ];

  onNewCharacter(   character:Character):void {
    console.log(character);
  }

}
