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
    description: "mainCV.description"
  }; // Variable donde guardarás el JSON dinámico

  mainCV = {
    description: "mainCV.description"
  };

  school01 = {
    title: "school01.title",
    description: "school01.description",
    timeTitle: "school01.timeTitle",
    time: "school01.time",
    images: "school01.images"               ,
  };

  school02 = {
    title: "school02.title",
    description: "school02.description",
    techTitle: "school02.techTitle",
    tech: "school02.tech",
  };

  school03 = {
    title: "school03.title",
    description: "school03.description",
    techTitle: "school03.techTitle",
    tech: "school03.tech",
    images: "school03.images"          ,
  };

  school04 = {
    title: "school04.title",
    description: "school04.description",
  };

  stupidFriendly = {
    title: "stupidFriendly.title",
    techTitle: "stupidFriendly.techTitle",
    tech: "stupidFriendly.tech"                    ,
    techtack: "stupidFriendly.techtack",
    dutiesTitle: "stupidFriendly.dutiesTitle",
    duties: "stupidFriendly.duties",
    timeTitle: "stupidFriendly.timeTitle",
    time: "stupidFriendly.time",
  };


  Infotec = {
    title: "Infotec.title",
    techTitle: "Infotec.techTitle",
    tech: "Infotec.tech",
    techtack: "Infotec.techtack",
    descTitle: "Infotec.descTitle",
    description: "Infotec.description",
    dutiesTitle: "Infotec.dutiesTitle",
    duties: "Infotec.duties",
    timeTitle: "Infotec.timeTitle",
    time: "Infotec.time",
  };


  Semovi = {
    title: "Semovi.title",
    techTitle: "Semovi.techTitle",
    tech: "Semovi.tech",
    techtack: "Semovi.techtack",
    descTitle: "Semovi.descTitle",
    description: "Semovi.description",
    timeTitle: "Semovi.timeTitle",
    time: "Semovi.time",
  };


  FletesTransportes = {
    title: "FletesTransportes.title" ,
    techTitle: "FletesTransportes.techTitle" ,
    tech: "FletesTransportes.tech"                                                 ,
    techtack: "FletesTransportes.techtack" ,
    descTitle: "FletesTransportes.descTitle" ,
    description: "FletesTransportes.description" ,
    dutiesTitle: "FletesTransportes.dutiesTitle" ,
    duties: "FletesTransportes.duties" ,
    methodologiesTitle: "FletesTransportes.methodologiesTitle" ,
    methodologies: "FletesTransportes.methodologies" ,
    achivementTitle: "FletesTransportes.achivementTitle" ,
    achivemens: "FletesTransportes.achivemens" ,
    timeTitle: "FletesTransportes.timeTitle" ,
    time: "FletesTransportes.time" ,
  };


  FletesTransportes01 = {
    title: "FletesTransportes01.title",
    techTitle: "FletesTransportes01.techTitle",
    tech: "FletesTransportes01.tech"         ,
    techtack: "FletesTransportes01.techtack",
    descTitle: "FletesTransportes01.descTitle",
    description: "FletesTransportes01.description",
    dutiesTitle: "FletesTransportes01.dutiesTitle",
    duties: "FletesTransportes01.duties",
    methodologiesTitle: "FletesTransportes01.methodologiesTitle",
    methodologies: "FletesTransportes01.methodologies",
    achivementTitle: "FletesTransportes01.achivementTitle",
    achivemens: "FletesTransportes01.achivemens",
    timeTitle: "FletesTransportes01.timeTitle",
    time: "FletesTransportes01.time",
  };


  FletesTransportes02 = {
    title: "FletesTransportes02.title",
    techTitle: "FletesTransportes02.techTitle",
    tech: "FletesTransportes02.tech"  ,
    techtack: "FletesTransportes02.techtack",
    descTitle: "FletesTransportes02.descTitle",
    description: "FletesTransportes02.description",
    dutiesTitle: "FletesTransportes02.dutiesTitle",
    duties: "FletesTransportes02.duties",
    methodologiesTitle: "FletesTransportes02.methodologiesTitle",
    methodologies: "FletesTransportes02.methodologies",
    achivementTitle: "FletesTransportes02.achivementTitle",
    achivemens: "FletesTransportes02.achivemens",
    timeTitle: "FletesTransportes02.timeTitle",
    time: "FletesTransportes02.time",
  };


  FletesTransportes03 = {
    title: "FletesTransportes03.title",
    techTitle: "FletesTransportes03.techTitle",
    tech: "FletesTransportes03.tech"      ,
    techtack: "FletesTransportes03.techtack",
    descTitle: "FletesTransportes03.descTitle",
    description: "FletesTransportes03.description",
    dutiesTitle: "FletesTransportes03.dutiesTitle",
    duties: "FletesTransportes03.duties",
    methodologiesTitle: "FletesTransportes03.methodologiesTitle",
    methodologies: "FletesTransportes03.methodologies",
    timeTitle: "FletesTransportes03.timeTitle",
    time: "FletesTransportes03.time",
  };


  pp01  = {
    title: "pp01.title",
    techTitle: "pp01.techTitle",
    tech: "pp01.tech",
    images: "pp01.images"               ,
    descTitle: "pp01.descTitle",
    description: "pp01.description",
  };

  pp02  = {
    title: "pp02.title",
    techTitle: "pp02.techTitle",
    tech: "pp02.tech",
    images: "pp02.images"          ,
    descTitle: "pp02.descTitle",
    description: "pp02.description",
  };

  pp03  = {
    title:"pp03.title",
    techTitle:"pp03.techTitle",
    tech:"pp03.tech",
    descTitle:"pp03.descTitle",
    description:"pp03.description"
  };

  pp04  = {
    title: "pp04.title",
    techTitle: "pp04.techTitle",
    tech: "pp04.tech",
    descTitle: "pp04.descTitle",
    description: "pp04.description",
  };

  pp05  = {
    title: "pp05.title",
    techTitle: "pp05.techTitle",
    tech: "pp05.tech",
    descTitle: "pp05.descTitle",
    description: "pp05.description",
  };

  pp06  = {
    title: "pp06.title",
    techTitle: "pp06.techTitle",
    tech: "pp06.tech",
    descTitle: "pp06.descTitle",
    description: "pp06.description",
  };

  pp07  = {
    title: "pp07.title",
    techTitle: "pp07.techTitle",
    tech: "pp07.tech",
    descTitle: "pp07.descTitle",
    description: "pp07.description",
  };

  curso01  = {
    title: "curso01.title",
    techTitle: "curso01.techTitle",
    tech: "curso01.tech",
    techtack: "curso01.techtack",
    dutiesTitle: "curso01.dutiesTitle",
    duties: "curso01.duties",
  };

  curso02  = {
    title: "curso02.title",
    techTitle: "curso02.techTitle",
    tech: "curso02.tech",
    techtack: "curso02.techtack",
    dutiesTitle: "curso02.dutiesTitle",
    duties: "curso02.duties",
  };

  curso03  = {
    title: "curso03.title",
    techTitle: "curso03.techTitle",
    tech: "curso03.tech",
    techtack: "curso03.techtack",
    dutiesTitle: "curso03.dutiesTitle",
    duties: "curso03.duties",
  };

  curso04  = {
    title: "curso04.title",
    techTitle: "curso04.techTitle",
    tech: "curso04.tech",
    techtack: "curso04.techtack",
    dutiesTitle: "curso04.dutiesTitle",
    duties: "curso04.duties",
  };

  curso05  = {
    title: "curso05.title",
    techTitle: "curso05.techTitle",
    tech: "curso05.tech",
    techtack: "curso05.techtack",
    dutiesTitle: "curso05.dutiesTitle",
    duties: "curso05.duties",
  };

  curso06  = {
    title: "curso06.title",
    techTitle: "curso06.techTitle",
    tech: "curso06.tech",
    techtack: "curso06.techtack",
    dutiesTitle: "curso06.dutiesTitle",
    duties: "curso06.duties",
  };

  curso07  = {
    title: "curso07.title",
    techTitle: "curso07.techTitle",
    tech: "curso07.tech",
    techtack: "curso07.techtack",
    dutiesTitle: "curso07.dutiesTitle",
    duties: "curso07.duties",
  };

  curso08  = {
    title: "curso08.title",
    techTitle: "curso08.techTitle",
    tech: "curso08.tech",
    techtack: "curso08.techtack",
    dutiesTitle: "curso08.dutiesTitle",
    duties: "curso08.duties",
  };

  curso09  = {
    title: "curso09.title",
    techTitle: "curso09.techTitle",
    tech: "curso09.tech",
    techtack: "curso09.techtack",
    dutiesTitle: "curso09.dutiesTitle",
    duties: "curso09.duties",
  };

  curso10  = {
    title: "curso10.title",
    techTitle: "curso10.techTitle",
    tech: "curso10.tech",
    techtack: "curso10.techtack",
    dutiesTitle: "curso10.dutiesTitle",
    duties: "curso10.duties",
  };

  curso11  = {
    title: "curso11.title",
    techTitle: "curso11.techTitle",
    tech: "curso11.tech",
    techtack: "curso11.techtack",
    dutiesTitle: "curso11.dutiesTitle",
    duties: "curso11.duties",
  };

  curso12 = {
    title: "curso12.title",
    techTitle: "curso12.techTitle",
    tech: "curso12.tech",
    techtack: "curso12.techtack",
    dutiesTitle: "curso12.dutiesTitle",
    duties: "curso12.duties",
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
        this.contentToShow = this.mainCV;
        break;
      case 2:
        this.contentToShow = this.school01;
        break;
      case 3:
        this.contentToShow = this.school02;
        break;
      case 4:
        this.contentToShow = this.school03;
        break;
      case 5:
        this.contentToShow = this.school04;
        break;
      case 6:
        this.contentToShow = this.stupidFriendly;
        break;
      case 7:
        this.contentToShow = this.Infotec;
        break;
      case 8:
        this.contentToShow = this.Semovi;
        break;
      case 9:
        this.contentToShow = this.FletesTransportes;
        break;
      case 10:
        this.contentToShow = this.FletesTransportes01;
        break;
      case 11:
        this.contentToShow = this.FletesTransportes02;
        break;
      case 12:
        this.contentToShow = this.FletesTransportes03;
        break;
      case 13:
        this.contentToShow = this.pp01 ;
        break;
      case 14:
        this.contentToShow = this.pp02 ;
        break;
      case 15:
        this.contentToShow = this.pp03 ;
        break;
      case 16:
        this.contentToShow = this.pp04 ;
        break;
      case 17:
        this.contentToShow = this.pp05 ;
        break;
      case 18:
        this.contentToShow = this.pp06 ;
        break;
      case 19:
        this.contentToShow = this.pp07 ;
        break;
      case 20:
        this.contentToShow = this.curso01 ;
        break;
      case 21:
        this.contentToShow = this.curso02 ;
        break;
      case 22:
        this.contentToShow = this.curso03 ;
        break;
      case 23:
        this.contentToShow = this.curso04 ;
        break;
      case 24:
        this.contentToShow = this.curso05 ;
        break;
      case 25:
        this.contentToShow = this.curso06 ;
        break;
      case 26:
        this.contentToShow = this.curso07 ;
        break;
      case 27:
        this.contentToShow = this.curso08 ;
        break;
      case 28:
        this.contentToShow = this.curso09 ;
        break;
      case 29:
        this.contentToShow = this.curso10 ;
        break;
      case 30:
        this.contentToShow = this.curso11 ;
        break;
      case 31:
        this.contentToShow = this.curso12;
        break;

      default:
        this.contentToShow = this.mainCV; // Valor por defecto si no coincide
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
