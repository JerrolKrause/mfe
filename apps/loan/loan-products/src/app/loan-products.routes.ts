import { Route } from '@angular/router';
import { LoanProductsComponent } from './loan-products.component';

export const appRoutes: Route[] = [
  {
    path: ``,
    component: LoanProductsComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
];
