import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from './layouts/CountryLayout/CountryLayout';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPage
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      },
    ]
  },

];

export default countryRoutes;
