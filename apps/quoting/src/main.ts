import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { QuotingModule } from './app/quoting.module';

platformBrowserDynamic()
  .bootstrapModule(QuotingModule)
  .catch((err) => console.error(err));
