/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { NoContentComponent } from 'apps/app-shell/src/app/routes/no-content/no-content.component';

export const appRoutes: Route[] = [
  /**
   * Dynamic Module Federation
   */
  {
    path: 'loan',
    children: [
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
    ],
  },
  /**
   * Static Module Federation
  {
    path: 'loan/:loanId/assets',
    loadChildren: () =>
      loadRemoteModule('assets', './Module').then((m) => m.AssetsModule),
  },
  {
    path: 'loan/:loanId/loan-products',
    loadChildren: () =>
      loadRemoteModule('loan-products', './Module').then(
        (m) => m.LoanProductsModule
      ),
  },
   */
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
