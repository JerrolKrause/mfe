import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/dashboard.config';
import { DashboardStandaloneModule } from './app/dashboard.module.standalone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(DashboardStandaloneModule)
  .catch(err => console.log(err));


/**
bootstrapApplication(DashboardModule, appConfig).catch((err) =>
  console.error(err)
);
 */