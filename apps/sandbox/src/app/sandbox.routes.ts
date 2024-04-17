import { Route } from '@angular/router';
import { EmbedComponent } from './routes/embed/embed.component';
import { SandboxComponent } from './sandbox.component';

export const SandboxRoutes: Route[] = [
  {
    path: 'embed/:branchId/:userId',
    component: EmbedComponent,
    data: { title: 'Sandbox' },
  },
  {
    path: 'embed',
    component: EmbedComponent,
    data: { title: 'Sandbox' },
  },
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
