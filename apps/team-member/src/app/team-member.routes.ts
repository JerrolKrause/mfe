import { Route } from '@angular/router';
import { TeamMemberComponent } from './team-member.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TeamMemberComponent,
    data: { title: 'Borrower Information' },
    children: [
      /**
          {
            path: 'products',
            component: ProductsComponent,
            data: { title: 'Borrower Information' },
          },
          */
    ],
  },
];
