import { MasterpageModule } from '$libs';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(DashboardRoutes),
    MasterpageModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
  bootstrap: [DashboardComponent],
})
export class DashboardStandaloneModule {}
