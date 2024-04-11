import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { userRoutes } from './users.routes';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes), MasterpageModule],
  providers: [provideClientHydration()],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
