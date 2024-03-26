import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { Step1Component } from './routes/step1/step1.component';

@NgModule({
  declarations: [AppComponent, Step1Component],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
