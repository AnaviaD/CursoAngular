import { Routes } from '@angular/router';
import { counterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';

export const routes: Routes = [

  {
    path: '',
    component: counterPageComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
