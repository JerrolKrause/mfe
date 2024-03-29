import { MasterpageModule } from '$libs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutes } from './sandbox.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes),
    MasterpageModule,
  ],
  declarations: [SandboxComponent],
  providers: [],
  exports: [],
  bootstrap: [SandboxComponent],
})
export class SandboxModule {}
