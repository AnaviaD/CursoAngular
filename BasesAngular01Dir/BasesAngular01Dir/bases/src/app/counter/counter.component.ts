import { Component } from "@angular/core";


@Component({
  selector: 'app-counter',
  template: `
  <hr>
  <h3>Counter: {{counter}}</h3>

  <button (click)="increaseBy(+1)"> +1 </button>
  <button (click)="resetFunc()"> Reset </button>
  <button (click)="increaseBy(-1)"> -1 </button>
  `,
})

export class CounterComponent{
  public counter: number = 10;

  resetFunc(): void
  {
    this.counter = 10;
  }

  increaseBy(value: number):void
  {
    this.counter += value;
  }
}
