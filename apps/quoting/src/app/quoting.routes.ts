import { Route } from '@angular/router';
import { AppComponent } from './quoting.component';
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
        data: { title: 'Step 1' },
        children: [],
      },
      {
        path: 'step2',
        component: Step1Component,
        data: { title: 'Step 2' },
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
