import { Component,  inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list';
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add";
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super.component.html',
})
export class DragonballSuperPageComponent {

  public dragonballService = inject(DragonBallService);


}
