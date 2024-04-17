import { Route } from '@angular/router';
import { QuotingMasterpageComponent } from './components/masterpage/masterpage.component';
import { AppComponent } from './quoting.component';
import { AddressComponent } from './routes/address/address.component';
import { BorrowerInfoComponent } from './routes/borrower-info/borrower-info.component';
import { HomeComponent } from './routes/home/home.component';
import { LoanReasonComponent } from './routes/loan-reason/loan-reason.component';
import { V1Component } from './routes/v1/v1.component';
import { V2Component } from './routes/v2/v2.component';
import { V3Component } from './routes/v3/v3.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    data: { title: 'Quoting' },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Welcome' },
      },
      {
        path: 'v1',
        component: V1Component,
        data: { title: 'Welcome' },
      },
      {
        path: 'v2',
        component: V2Component,
        data: { title: 'Welcome' },
      },
      {
        path: 'v3',
        component: V3Component,
        data: { title: 'Welcome' },
      },
      {
        path: '',
        component: QuotingMasterpageComponent,
        data: { title: 'Borrower Information' },
        children: [
          {
            path: 'loan-reason',
            component: LoanReasonComponent,
            data: { title: 'Borrower Information' },
          },
          {
            path: 'address',
            component: AddressComponent,
            data: { title: 'Borrower Information' },
          },
          {
            path: 'borrower-info',
            component: BorrowerInfoComponent,
            data: { title: 'Borrower Information' },
          },
        ],
      },
    ],
  },
];
