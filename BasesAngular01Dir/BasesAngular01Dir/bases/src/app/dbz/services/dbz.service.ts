import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({providedIn: 'root'})
export class DbzService{

  public characters: Character[] = [{
    id: uuid(),
    name: 'Krillin',
    power: 500
  },{
    id: uuid(),
    name: 'Goku',
    power: 10000
  },
  {
    id: uuid(),
    name    :'Trunks',
    power   :100000
  },
  {
    id: uuid(),
    name    :'Vegeta',
    power   :7000
  }];

  onNewCharacterPadre({name, power}:Character): void
  {

    const newCharacter: Character ={
      id: uuid(),
      name,
      power,
    }

    this.characters.push(newCharacter);
  }

  onDeletePadre(index:number): void{
    this.characters.splice(index, 1);
  }

}
