/* eslint-disable @nx/enforce-module-boundaries */
import { RouterModule, Routes } from '@angular/router';

/**
 * Lazy load/chunk 3rd party librarys and components
 */
const routes: Routes = [
  // App global components
  {
    path: '~',
    loadChildren: () => import('$libs').then((m) => m.MasterpageModule),
  },
  {
    path: '~',
    loadChildren: () => import('$libs').then((m) => m.IconsComponent),
  },
  // Angular libs
  {
    path: '~',
    loadChildren: () => import('@angular/forms').then((m) => m.FormsModule),
  },
  {
    path: '~',
    loadChildren: () =>
      import('@angular/forms').then((m) => m.ReactiveFormsModule),
  },
  // Prime libs
  {
    path: '~',
    loadChildren: () => import('primeng/card').then((m) => m.CardModule),
  },
  {
    path: '~',
    loadChildren: () =>
      import('primeng/messages').then((m) => m.MessagesModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/table').then((m) => m.TableModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/tree').then((m) => m.TreeModule),
  },
];

export const LibsLazyLoad = RouterModule.forChild(routes);
