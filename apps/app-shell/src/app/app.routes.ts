/* eslint-disable @nx/enforce-module-boundaries */
import { AuthGuard } from '$shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
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
];
