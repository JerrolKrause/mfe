import { Route } from '@angular/router';
import { SandboxComponent } from './sandbox.component';

export const SandboxRoutes: Route[] = [
  {
    path: ':branchId/:userId',
    component: SandboxComponent,
    data: { title: 'Sandbox' },
  },
  {
    path: '',
    component: SandboxComponent,
    data: { title: 'Sandbox' },
  },
];
