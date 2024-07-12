import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  constructor() { }

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
    this.characters_list.unshift(character);
  }

  onDeleteCharacter(charId:number):void {
    this.characters_list.splice(charId, 1);
  }
}
