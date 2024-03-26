import { Route } from '@angular/router';
import { SandboxComponent } from './sandbox.component';

export const SandboxRoutes: Route[] = [
    {
        path: '',
        component: SandboxComponent,
        data: { title: 'Sandbox' },
      },
];
