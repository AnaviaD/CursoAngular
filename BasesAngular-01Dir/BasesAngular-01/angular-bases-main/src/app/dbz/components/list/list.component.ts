import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  @Input()
  public characterListComponent: Character[] = [];
}
