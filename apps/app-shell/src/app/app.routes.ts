/* eslint-disable @nx/enforce-module-boundaries */
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'assets',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'assets',
        exposedModule: './Module',
      }).then((m) => m.AssetsModule),
  },
  {
    path: 'loan-products',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'loan-products',
        exposedModule: './Module',
      }).then((m) => m.LoanProductsModule),
  },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'assets',
        exposedModule: './Module',
      }).then((m) => m.AssetsModule),
  },
  /**
  {
    path: 'loan',
    loadChildren: () =>
      import('../../../loan/loan.module').then((m) => m.LoanModule),
  },

  // Demo Routes
  {
    path: 'quoting',
    loadChildren: () =>
      import('@quoting/app/quoting.module').then((m) => m.QuotingModule),
    canActivate: [AuthGuard],
  },
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
