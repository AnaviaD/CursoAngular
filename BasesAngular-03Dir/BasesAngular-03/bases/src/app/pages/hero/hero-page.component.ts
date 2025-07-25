import { Component, computed, signal } from "@angular/core";


@Component({
  templateUrl: 'hero-page.component.html'
})
export class HeroPageComponent
{
  name = signal('Ironman')
  age = signal(45)


  getHeroDescription() {
    return `${ this.name() } - ${ this.age() }`
  }

  heroDescription = computed(() =>{
    const description = `${this.name()} - ${this.age()}`
    return description;
  });

  changeHero() {
    this.name.set('spiderman')
    this.age.set(22)
  }

  changeAge() {
    this.age.set(60)
  }


  resetForm() {
    this.name.set('Ironman')
    this.age.set(45)
  }

}
