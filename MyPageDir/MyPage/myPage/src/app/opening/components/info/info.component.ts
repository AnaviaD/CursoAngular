import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  isVisible: boolean = false;
  isSwitchOn: boolean = false;

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  contentToShow: any = {
    title: "pageInfo.title",
    descTitle: "pageInfo.descTitle",
    description: "pageInfo.description",
    techTitle: "pageInfo.techTitle",
    tech: "pageInfo.tech",
  };

  chunkArray(arr: any[], chunkSize: number) {
    const results = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      results.push(arr.slice(i, i + chunkSize));
    }
    return results;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  open() {
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
