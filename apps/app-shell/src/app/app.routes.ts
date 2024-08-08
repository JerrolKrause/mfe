/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  /**
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
  }, */
  {
    path: '',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '*',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },
];
