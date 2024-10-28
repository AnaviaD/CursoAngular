import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  isVisible: boolean = false;
  isSwitchOn: boolean = false;

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  contentToShow: any = {
    description01 : "mainCV.description01",
    description02 : "mainCV.description02",
    description03 : "mainCV.description03",
    description04 : "mainCV.description04",
    description05 : "mainCV.description05",
    description06 : "mainCV.description06",
    switchTitle : "mainCV.switchTitle",
    images: "mainCV.images",
    title : "mainCV.title",
    prof  : "mainCV.prof",
    prof01  : "mainCV.prof01",
    secProf : "mainCV.secProf"
  };



  switchLanguage(language: string) {
    this.translate.use(language);
  }

  open(clickedObject: number) {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  changetoSp(){
    this.translate.use('es');
  }

  changetoEn(){
    this.translate.use('en');
  }

  getTranslationKey(property: string): string {
    // console.log(this.contentToShow[property]);
    return this.contentToShow[property];
  }

}
