import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DbzService{

  public characters: Character[] = [{
    name: 'Krillin',
    power: 500
  },{
    name: 'Goku',
    power: 10000
  },
  {
    name    :'Trunks',
    power   :100000
  },
  {
    name    :'Vegeta',
    power   :7000
  }];

  onNewCharacterPadre(caracter:Character): void
  {
    this.characters.push(caracter);
  }

  onDeletePadre(index:number): void{
    this.characters.splice(index, 1);
  }

}
