import { bootstrapApplication } from '@angular/platform-browser';
import { SandboxComponent } from './app/sandbox.component';
import { appConfig } from './app/sandbox.config';

bootstrapApplication(SandboxComponent, appConfig).catch((err) =>
  console.error(err)
);
