import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { FirstStepComponent } from './pages/first-step/first-step.component';
import { OpeningRoutingModule } from './opening-routing.module';



@NgModule({
  declarations: [
    WelcomePageComponent,
    FirstStepComponent
  ],
  imports: [
    CommonModule,
    OpeningRoutingModule
  ]
})
export class OpeningModule { }
