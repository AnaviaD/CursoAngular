import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { MultiplyPageComponent } from './pages/counter/multiply-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballPageComponent } from './pages/dragonball/dragonball-page/dragonball-page';

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
    path: '**',
    redirectTo: ''
  },
];
