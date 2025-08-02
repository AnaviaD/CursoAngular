import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { MultiplyPageComponent } from './pages/counter/multiply-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballPageComponent } from './pages/dragonball-page/dragonball-page';
import { DragonballSuperPageComponent } from './pages/dragonball-super/dragonball-super-page.component';

export const routes: Routes = [
  {
    path:'add',
    component:CounterPageComponent
  },
  {
    path:'multiply',
    component:MultiplyPageComponent
  },
  {
    path:'hero',
    component:HeroPageComponent
  },
  {
    path: 'dragonball',
    component:DragonballPageComponent
  },
  {
    path: 'dragonball-super',
    component:DragonballSuperPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];
