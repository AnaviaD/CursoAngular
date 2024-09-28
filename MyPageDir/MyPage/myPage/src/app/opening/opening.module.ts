import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { FirstStepComponent } from './pages/first-step/first-step.component';
import { OpeningRoutingModule } from './opening-routing.module';
import { FloatingCardComponent } from './components/floating-card/floating-card.component';
import { GFSceneComponent } from './pages/gfscene/gfscene.component';
import { CatSceneComponent } from './pages/cat-scene/cat-scene.component';
import { CarSceneComponent } from './pages/car-scene/car-scene.component';
import { TransportComponent } from './pages/transport/transport.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    WelcomePageComponent,
    FirstStepComponent,
    FloatingCardComponent,
    GFSceneComponent,
    CatSceneComponent,
    CarSceneComponent,
    TransportComponent
  ],
  imports: [
    CommonModule,
    OpeningRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class OpeningModule { }
