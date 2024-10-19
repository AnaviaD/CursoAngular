import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css']
})
export class MainCardComponent {

  isVisible: boolean = false;

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  contentToShow: any = {
    description : "mainCV.description",
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
