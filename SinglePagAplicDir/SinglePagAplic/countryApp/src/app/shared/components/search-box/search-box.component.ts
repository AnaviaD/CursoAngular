import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder:string='';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  emitValue(value: string):void
  {
    this.onValue.emit( value  )
  }
}