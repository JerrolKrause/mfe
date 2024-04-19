import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CustomerModule } from './app/customer.module';

platformBrowserDynamic()
  .bootstrapModule(CustomerModule)
  .catch((err) => console.error(err));
