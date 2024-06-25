import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public name: string = 'ironman';
  public age: number = 45;

  get capitalizedName(): string
  {
    return this.name.toUpperCase();
  }

  public getHeroesDescription(): string
  {
    return `${this.name} - ${this.age}`;
  }

  public changeHero(): void
  {
    this.name = `${this.name} Se la come como lokita`;
  }

  public changeAge(): void
  {
    this.age = this.age + 69;
  }

  public resetForm(): void
  {
    this.name = 'ironman';
    this.age = 45;
  }

}
