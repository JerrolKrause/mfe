import { Route } from '@angular/router';
import { AppComponent } from './quoting.component';
import { BorrowerInfoComponent } from './routes/borrower-info/borrower-info.component';
import { HomeComponent } from './routes/home/home.component';
import { LoanReasonComponent } from './routes/loan-reason/loan-reason.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    data: { title: 'Quoting' },
    children: [
      {
        path: 'loan-reason',
        component: LoanReasonComponent,
        data: { title: 'Borrower Information' },
      },
      {
        path: 'borrower-info',
        component: BorrowerInfoComponent,
        data: { title: 'Borrower Information' },
      },
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Welcome' },
      },
    ],
  },
];
