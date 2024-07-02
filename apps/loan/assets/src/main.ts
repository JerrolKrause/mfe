import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AssetsModule } from './app/assets.module';

platformBrowserDynamic()
  .bootstrapModule(AssetsModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
