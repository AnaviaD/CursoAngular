import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { FirstStepComponent } from './pages/first-step/first-step.component';
import { GFSceneComponent } from './pages/gfscene/gfscene.component';
import { CatSceneComponent } from './pages/cat-scene/cat-scene.component';
import { CarSceneComponent } from './pages/car-scene/car-scene.component';
import { TransportComponent } from './pages/transport/transport.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'first',
    component : FirstStepComponent
  },
  {
    path: 'GF',
    component : GFSceneComponent
  },
  {
    path: 'cat',
    component : CatSceneComponent
  },
  {
    path: 'car',
    component : CarSceneComponent
  },
  {
    path: 'transport',
    component : TransportComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class OpeningRoutingModule { }
