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
    title: "stupidFriendly.title",
    techTitle: "stupidFriendly.techTitle",
    tech: "stupidFriendly.tech",
    techtack: "stupidFriendly.techtack",
    dutiesTitle: "stupidFriendly.dutiesTitle",
    duties: "stupidFriendly.duties",
    achivementTitle: "stupidFriendly.achivementTitle",
    achivemens: "stupidFriendly.achivemens",
    timeTitle: "stupidFriendly.timeTitle",
    time: "stupidFriendly.time"
  }; // Variable donde guardarás el JSON dinámico

  // JSONs que cambiarán dependiendo de contentNumber
  content1 = {
    title: "stupidFriendly.title",
    techTitle: "stupidFriendly.techTitle",
    tech: "stupidFriendly.tech",
    techtack: "stupidFriendly.techtack",
    descTitle: "stupidFriendly.descTitle",
    description: "stupidFriendly.description",
    dutiesTitle: "stupidFriendly.dutiesTitle",
    duties: "stupidFriendly.duties",
    achivementTitle: "stupidFriendly.achivementTitle",
    achivemens: "stupidFriendly.achivemens",
    timeTitle: "stupidFriendly.timeTitle",
    time: "stupidFriendly.time"
  };

  content2 = {
    title: "Desarrollador Sr",
    techtack: ["Node.js, TypeScript, AWS"],
    description: "Trabajando en desarrollo backend"
  };

  defaultContent = {
    title: 'stupidFriendly.title0',
    techtack: "Default Tech",
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
        this.contentToShow = this.contentToShow; // Valor por defecto si no coincide
        break;
    }
  }

  close() {
    this.isVisible = false;
    this.contentToShow = null; // Resetea el contenido cuando cierras
  }

  getTranslationKey(property: string): string {
    // console.log(this.contentToShow[property]);
    return this.contentToShow[property];
  }

  changetoSp(){
    this.translate.use('es');
  }

  changetoEn(){
    this.translate.use('en');
  }

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
