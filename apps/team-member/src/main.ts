import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TeamMemberModule } from './app/team-member.module';

platformBrowserDynamic()
  .bootstrapModule(TeamMemberModule)
  .catch((err) => console.error(err));
