import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-card',
  templateUrl: './floating-card.component.html',
  styleUrls: ['./floating-card.component.css']
})
export class FloatingCardComponent {
  isVisible: boolean = true;        //Cambiar a false
  // contentToShow: number | null = 1; // Variable que decide qué contenido mostrar
  //Declaramos este obj como Default
  contentToShow: any = {
    title: "stupidFriendly.title01",
    tech: "Angular, TypeScript",
    description: "Trabajando en desarrollo frontend"
  }; // Variable donde guardarás el JSON dinámico

  // JSONs que cambiarán dependiendo de contentNumber
  content1 = {
    title: "stupidFriendly.title01",
    tech: "Angular, TypeScript",
    description: "Trabajando en desarrollo frontend"
  };

  content2 = {
    title: "Desarrollador Sr",
    tech: "Node.js, TypeScript, AWS",
    description: "Trabajando en desarrollo backend"
  };

  defaultContent = {
    title: 'stupidFriendly.title0',
    tech: "Default Tech",
    description: "Default Description"
  };


  open(contentNumber: number){
    this.isVisible = true;
     // Dependiendo del número asignamos un JSON diferente
     switch(contentNumber) {
      case 1:
        this.contentToShow = this.content1; // Asigna el JSON 1
        break;
      case 2:
        this.contentToShow = this.content2; // Asigna el JSON 2
        break;
      default:
        this.contentToShow = this.defaultContent; // Valor por defecto si no coincide
        break;
    }
  }

  close() {
    this.isVisible = false;
    this.contentToShow = null; // Resetea el contenido cuando cierras
  }

  getTranslationKey(property: string): string {
    console.log(this.contentToShow[property]);
    return this.contentToShow[property];
  }

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
