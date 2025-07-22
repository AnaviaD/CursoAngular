import { Component } from "@angular/core";



@Component({
  templateUrl: './multiply-page.component.html'
})
export class MultiplyPageComponent{

  base = 2;

  multiplyBy(value: number){
    this.base *= value;
  }

  divideBy(value: number){
    this.base /= value;
  }

  reset(){
    this.base = 2;
  }
}
