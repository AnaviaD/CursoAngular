import { Component, signal } from "@angular/core";



@Component({
  templateUrl: './counter-page.component.html'
})
export class CounterPageComponent {

  counter = 10;
  counterSignal = signal(10);

  increaseBy(value: number){
    this.counter += 1;
    this.counterSignal.update((current) => current + value);
  }

  decreaseBy(value: number){
    this.counter -= 1;
  }

  resetBy()
  {
    this.counter = 10;
    this.counterSignal.set(10);
  }
}
