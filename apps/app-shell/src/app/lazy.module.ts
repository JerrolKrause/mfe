/* eslint-disable @nx/enforce-module-boundaries */
import { RouterModule, Routes } from '@angular/router';

/**
 * Lazy load/chunk 3rd party librarys and components
 */
const routes: Routes = [
  // App global components
  {
    path: '~',
    loadChildren: () => import(`$masterpage`).then((m) => m.MasterpageModule),
  },
  {
    path: '~',
    loadChildren: () => import(`$icons`).then((m) => m.IconsModule),
  },
  {
    path: '~',
    loadChildren: () => import(`$forms`).then((m) => m.FormsLibModule),
  },
  {
    path: '~',
    loadChildren: () =>
      import(`$state-management`).then((m) => m.StateManagementModule),
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
  {
    path: '~',
    loadChildren: () =>
      import('@fortawesome/angular-fontawesome').then(
        (m) => m.FontAwesomeModule
      ),
  },
  {
    path: '~',
    loadChildren: () => import('apollo-angular').then((m) => m.ApolloModule),
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
  {
    path: '~',
    loadChildren: () => import('primeng/toast').then((m) => m.ToastModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/button').then((m) => m.ButtonModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/sidebar').then((m) => m.SidebarModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/accordion').then((m) => m.Accordion),
  },
];

export const LibsLazyLoad = RouterModule.forChild(routes);
