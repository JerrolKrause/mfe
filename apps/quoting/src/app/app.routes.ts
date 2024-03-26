import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { Step1Component } from './routes/step1/step1.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    data: { title: 'Quoting' },
    children: [
      {
        path: 'step1',
        component: Step1Component,
        data: { title: 'Quoting' },
        children: [],
      },
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Quoting' },
        children: [],
      },
    ],
  },
];
