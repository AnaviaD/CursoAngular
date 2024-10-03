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

  // contentToShow: any = {
  //   title: "stupidFriendly.title",
  //   techTitle: "stupidFriendly.techTitle",
  //   tech: "stupidFriendly.tech",
  //   techtack: "stupidFriendly.techtack",
  //   descTitle: "stupidFriendly.descTitle",
  //   description: "stupidFriendly.description",
  //   dutiesTitle: "stupidFriendly.dutiesTitle",
  //   duties: "stupidFriendly.duties",
  //   achivementTitle: "stupidFriendly.achivementTitle",
  //   achivemens: "stupidFriendly.achivemens",
  //   methodologiesTitle: "stupidFriendly.methodologiesTitle",
  //   methodologies: "stupidFriendly.methodologies",
  //   timeTitle: "stupidFriendly.timeTitle",
  //   time: "stupidFriendly.time"
  // };

  contentToShow: any = {
    title: "FletesTransportes.title",
    techTitle: "FletesTransportes.techTitle",
    tech: "FletesTransportes.tech",
    techtack: "FletesTransportes.techtack",
    descTitle: "FletesTransportes.descTitle",
    description: "FletesTransportes.description",
    dutiesTitle: "FletesTransportes.dutiesTitle",
    duties: "FletesTransportes.duties",
    achivementTitle: "FletesTransportes.achivementTitle",
    achivemens: "FletesTransportes.achivemens",
    methodologiesTitle: "FletesTransportes.methodologiesTitle",
    methodologies: "FletesTransportes.methodologies",
    timeTitle: "FletesTransportes.timeTitle",
    time: "FletesTransportes.time"
  }; // Variable donde guardarás el JSON dinámico

  content1 = {
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
  content2 = {
    title: "Infotec.title",
    techTitle: "Infotec.techTitle",
    tech: "Infotec.tech",
    techtack: "Infotec.techtack",
    descTitle: "Infotec.descTitle",
    description: "Infotec.description",
    dutiesTitle: "Infotec.dutiesTitle",
    duties: "Infotec.duties",
    // achivementTitle: "Infotec.achivementTitle",
    // achivemens: "Infotec.achivemens",
    methodologiesTitle: "Infotec.methodologiesTitle",
    methodologies: "Infotec.methodologies",
    timeTitle: "Infotec.timeTitle",
    time: "Infotec.time"
  };

  content3 = {
    title: "FletesTransportes.title",
    techTitle: "FletesTransportes.techTitle",
    tech: "FletesTransportes.tech",
    techtack: "FletesTransportes.techtack",
    descTitle: "FletesTransportes.descTitle",
    description: "FletesTransportes.description",
    dutiesTitle: "FletesTransportes.dutiesTitle",
    duties: "FletesTransportes.duties",
    achivementTitle: "FletesTransportes.achivementTitle",
    achivemens: "FletesTransportes.achivemens",
    methodologiesTitle: "FletesTransportes.methodologiesTitle",
    methodologies: "FletesTransportes.methodologies",
    timeTitle: "FletesTransportes.timeTitle",
    time: "FletesTransportes.time"
  };

  content16 = {
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
      case 3:
        this.contentToShow = this.content3; // Asigna el JSON 2
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
