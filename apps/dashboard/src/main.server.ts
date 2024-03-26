import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardModule } from './app/dashboard.module';
import { config } from './app/dashboard.config.server';

const bootstrap = () => bootstrapApplication(DashboardModule, config);

export default bootstrap;
