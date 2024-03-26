import { bootstrapApplication } from '@angular/platform-browser';
import { SandboxComponent } from './app/sandbox.component';
import { config } from './app/sandbox.config.server';

const bootstrap = () => bootstrapApplication(SandboxComponent, config);

export default bootstrap;
