/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { NoContentComponent } from 'apps/app-shell/src/app/routes/no-content/no-content.component';

export const appRoutes: Route[] = [
  {
    path: 'loan',
    children: [
      /**
       * Static Module Federation
       */
      {
        path: `:loanId/loan-products`,
        loadChildren: () =>
          import('@loan-products/app/loan-products.module').then(
            (m) => m.LoanProductsModule
          ),
      },
      {
        path: `:loanId/assets`,
        loadChildren: () =>
          import('@assets/app/assets.module').then((m) => m.AssetsModule),
      },
      /**
       * Dynamic Module Federation
       * Not for the faint of heart
      {
        path: ':loanId/loan-products',
        loadChildren: () =>
          loadRemoteModule('loan-products', './Module').then(
            (m) => m.LoanProductsModule
          ),
      },
      {
        path: ':loanId/assets',
        loadChildren: () =>
          loadRemoteModule('assets', './Module').then((m) => m.AssetsModule),
      },
      */
    ],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ``,
    component: NoContentComponent,
    data: { title: 'Coming Soon' },
  },
  {
    path: `**`,
    component: NoContentComponent,
    data: { title: 'Coming Soon' },
  },
  /**
   * POCs and legacy
  {
    path: 'users',
    loadChildren: () =>
      import('@users/app/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'sandbox',
    loadChildren: () =>
      import('@sandbox/app/sandbox.module').then((m) => m.SandboxModule),
  },

  {
    path: 'loan',
    loadChildren: () =>
      import('../../../loan/loan.module').then((m) => m.LoanModule),
  },

  {
    path: 'quoting',
    loadChildren: () =>
      import('@quoting/app/quoting.module').then((m) => m.QuotingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'class-web',
    loadChildren: () =>
      import('@team-member/app/team-member.module').then(
        (m) => m.TeamMemberModule
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('../../../loan/loan.module').then((m) => m.LoanModule),
  },
  */
];
