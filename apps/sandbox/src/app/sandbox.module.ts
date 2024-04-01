import { MasterpageModule } from '$libs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutes } from './sandbox.routes';

@NgModule({
  declarations: [SandboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes),
    MasterpageModule,
  ],
  providers: [provideClientHydration()],
  exports: [],
  bootstrap: [SandboxComponent],
})
export class SandboxModule {}
