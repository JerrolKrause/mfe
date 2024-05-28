import { Route } from '@angular/router';
import { LoanProductsComponent } from './loan-products.component';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { SelectLoanIdComponent } from './routes/select-loan-id/select-loan-id.component';
import { SelectLoanTaskComponent } from './routes/select-loan-task/select-loan-task.component';

export const appRoutes: Route[] = [
  {
    path: ':loanId/loan-products',
    component: LoanProductsComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
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
    path: '**',
    component: NoContentComponent,
    data: { title: 'Loan Products' },
    children: [],
  },
];
