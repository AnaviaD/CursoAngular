import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  slides = [
    {img: "assets/imgObj/code.gif"},
    {img: "assets/imgObj/proto03.jpeg"},
    {img: "assets/imgObj/mask01.gif"},
    {img: "assets/imgObj/mask (3).jpeg"},
    {img: "assets/imgObj/tinder01.gif"},
    {img: "assets/imgObj/kosko (2).jpeg"},
    {img: "assets/imgObj/torretGun02.jpeg"}
  ];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings":{
          "arrows": true,
          "infinite": true,
          "slideToShow": 1,
          "slideToScroll": 1
        }
      }
    ]
  };


  contentToShow: any = {
    images: "mainCV.images",
  };

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
