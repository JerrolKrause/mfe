/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sandbox',
    loadChildren: () =>
      import('@sandbox/app/sandbox.module').then((m) => m.SandboxModule),
  },
  {
    path: 'quoting',
    loadChildren: () =>
      import('@quoting/app/quoting.module').then((m) => m.QuotingModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@dashboard/app/dashboard.module').then((m) => m.DashboardModule),
  },
];
