import { Route } from '@angular/router';
import { AssetsComponent } from './assets.component';

export const appRoutes: Route[] = [
  {
    path: ``,
    component: AssetsComponent,
    data: { title: 'Assets' },
    children: [],
  },
  {
    path: `*`,
    component: AssetsComponent,
    data: { title: 'Assets' },
    children: [],
  },
];
