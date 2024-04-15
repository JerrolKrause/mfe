import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { userRoutes } from './users.routes';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(userRoutes),
    MasterpageModule,
  ],
  providers: [],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
