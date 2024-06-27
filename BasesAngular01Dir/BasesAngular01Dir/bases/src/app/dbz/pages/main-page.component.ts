import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl:  './main-page.component.html'
})

export class MainPageComponent{

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
      console.log('MainPage');
      console.log(caracter);
    }

}
