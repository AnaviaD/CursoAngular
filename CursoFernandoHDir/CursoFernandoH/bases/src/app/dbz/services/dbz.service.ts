import { Injectable } from "@angular/core";
import { v4 as uuid } from 'uuid';
import { Character } from "../interfaces/character.interface";

@Injectable({
  providedIn:'root'
})
export class DbzService{
  public characters: Character[] = [{
    id: uuid(),
    name:'krilin',
    power:1000
  },
  {
    id: uuid(),
    name:'Goku',
    power:9500
  },
  {
    id: uuid(),
    name:'Vegeta',
    power:7500
  }];

  onNewCharacter(character: Character):void{
    this.characters.push(character);
  }

  onDeleteCharacter(index:number){
    this.characters.splice(index, 1);
  }
}
