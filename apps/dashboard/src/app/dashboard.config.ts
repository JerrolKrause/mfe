import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), provideRouter(DashboardRoutes)],
};
