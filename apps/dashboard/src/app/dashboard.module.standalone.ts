import { NgModule } from '@angular/core';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';
import { MasterpageModule } from '$libs';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(DashboardRoutes),
    MasterpageModule
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
  bootstrap: [DashboardComponent],
})
export class DashboardStandaloneModule {}
