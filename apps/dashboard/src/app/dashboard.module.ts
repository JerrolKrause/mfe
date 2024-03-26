import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';
import { MasterpageModule } from '$libs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MasterpageModule
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
