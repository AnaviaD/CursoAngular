import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public name: string = 'Ironman';
  public age: number = 45;

  get capitalizedName():string { return this.name.toUpperCase(); }

  heroDescription():string { return `${this.name} - ${this.age}`;}

  changeHero():void {
    this.name = 'Spiderman';
  }

  changeAge():void {
    this.age = 20
  }

  reset():void {
    this.name = 'Ironman';
    this.age = 45

    //Errores dificiles de corregir
    //Por eso existen las variables y la impresion de esas variables {{name}}
    document.querySelectorAll('h1')!.forEach(element => {
      element.innerHTML = `<h1>Desde Angular!</h1>`;
    });
  }
}
