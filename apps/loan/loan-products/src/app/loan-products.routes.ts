import { Route } from '@angular/router';
import { LoanProductsComponent } from './loan-products.component';
import { NoContentComponent } from './routes/no-content/no-content.component';

export const appRoutes: Route[] = [
  {
    path: `:loanId/loan-products`,
    component: LoanProductsComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
  {
    path: '**',
    component: NoContentComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
];
