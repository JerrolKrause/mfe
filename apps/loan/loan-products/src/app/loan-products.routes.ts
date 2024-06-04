import { applicationRoutes } from '$shared';
import { Route } from '@angular/router';
import { LoanProductsComponent } from './loan-products.component';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { SelectLoanIdComponent } from './routes/select-loan-id/select-loan-id.component';
import { SelectLoanTaskComponent } from './routes/select-loan-task/select-loan-task.component';

export const appRoutes: Route[] = [
  // Generate all the loan products routes
  ...applicationRoutes.map((route) => ({
    path: `:loanId/${route.path}`,
    component:
      route.path === 'loan-products'
        ? LoanProductsComponent
        : NoContentComponent, // Stub code
    data: { title: route.label },
    children: [],
  })),
  {
    path: ':loanId',
    component: SelectLoanTaskComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
  {
    path: '',
    component: SelectLoanIdComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
  {
    path: ':loanId/*',
    component: NoContentComponent,
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
