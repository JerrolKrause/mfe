import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { UsersComponent } from './users.component';
import { UsersModule } from './users.module';

@NgModule({
  imports: [UsersModule, ServerModule],
  bootstrap: [UsersComponent],
})
export class AppServerModule {}
