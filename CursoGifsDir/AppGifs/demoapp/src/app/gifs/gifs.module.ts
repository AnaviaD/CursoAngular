import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardLilstComponent } from './components/card-lilst/card-lilst.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardLilstComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
