import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { MultiplyPageComponent } from './pages/counter/multiply-page.component';

export const routes: Routes = [
  {
    path:'add',
    component:CounterPageComponent
  },
  {
    path:'multiply',
    component:MultiplyPageComponent
  }
];
