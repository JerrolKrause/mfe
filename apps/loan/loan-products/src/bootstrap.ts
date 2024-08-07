import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoanProductsModule } from './app/loan-products.module';

platformBrowserDynamic()
  .bootstrapModule(LoanProductsModule)
  .catch((err) => console.error(err));
