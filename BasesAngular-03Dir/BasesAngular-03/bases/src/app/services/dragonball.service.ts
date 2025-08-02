import { effect, Injectable, signal } from '@angular/core';

const loadFromLocalStorage = (): Character[] =>{

  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters):[];

  return []
}

@Injectable({providedIn: 'root'})
export class DragonballService {

  constructor() { }

  saveToLocalStorage = effect( () => {
    localStorage.setItem('characters', JSON.stringify(this.characters()))
  })

  characters  = signal<Character[]>(
    loadFromLocalStorage()
  );

  addCharacter(character: Character) {
    this.characters.update((list) => [... list, character]);
  }


}
