import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutes } from './sandbox.routes';
import { RouterModule } from '@angular/router';
import { MasterpageModule } from '$libs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes),
    MasterpageModule,
  ],
  declarations: [SandboxComponent],
  providers: [],
  exports: [],
})
export class SandboxModule {}
