import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/sandbox.config';
import { AppComponent } from './app/sandbox.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
