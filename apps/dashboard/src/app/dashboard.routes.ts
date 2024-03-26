import { Route } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

export const DashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
];
