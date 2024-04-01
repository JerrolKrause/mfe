import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SandboxModule } from './app/sandbox.module';

platformBrowserDynamic()
  .bootstrapModule(SandboxModule)
  .catch((err) => console.error(err));
