import { MasterpageModule } from '$libs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './quoting.component';
import { appRoutes } from './quoting.routes';
import { Step1Component } from './routes/step1/step1.component';

@NgModule({
  declarations: [AppComponent, Step1Component],
  imports: [CommonModule, RouterModule.forChild(appRoutes), MasterpageModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class QuotingModule {}
