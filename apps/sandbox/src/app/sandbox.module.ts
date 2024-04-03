import { MasterpageModule, StateManagementModule } from '$libs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutes } from './sandbox.routes';

@NgModule({
  declarations: [SandboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes),
    MasterpageModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    InputOtpModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    StateManagementModule,
  ],
  providers: [provideClientHydration()],
  exports: [],
  bootstrap: [SandboxComponent],
})
export class SandboxModule {}
