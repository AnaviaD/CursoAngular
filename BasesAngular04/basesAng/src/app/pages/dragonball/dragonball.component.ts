import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character{
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [NgClass],
  templateUrl: './dragonball.component.html',
})
export class DragonballPageComponent {

  name = signal('Gohan');
  power = signal(100);


  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power:9001},
    { id: 2, name: 'Vegeta', power:8000},
    { id: 3, name: 'Piccolo', power:300},
  ]);

  powerClasses = computed(() =>{
    return{
      'text-danger': true
    }
  })
}
