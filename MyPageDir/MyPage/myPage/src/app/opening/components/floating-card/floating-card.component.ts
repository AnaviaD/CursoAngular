import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-card',
  templateUrl: './floating-card.component.html',
  styleUrls: ['./floating-card.component.css']
})
export class FloatingCardComponent {
  isVisible: boolean = false;
  contentToShow: number | null = null; // Variable que decide qué contenido mostrar

  open(contentNumber: number){
    this.isVisible = true;
    this.contentToShow = contentNumber; // Asigna el número recibido
  }

  close() {
    this.isVisible = false;
    this.contentToShow = null; // Resetea el contenido cuando cierras
  }
}
