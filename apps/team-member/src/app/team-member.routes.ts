import { Route } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { TeamMemberComponent } from './team-member.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TeamMemberComponent,
    data: { title: 'Borrower Information' },
    children: [
      {
        path: ':loanID/loan-products',
        component: HomeComponent,
        data: { title: 'Borrower Information' },
      },
      {
        path: 'loan-products',
        component: HomeComponent,
        data: { title: 'Borrower Information' },
      },
    ],
  },
];
