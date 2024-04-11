import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MasterpageModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
