import { MasterpageModule } from '$masterpage';
import { StateManagementModule } from '$state-management';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutes } from './sandbox.routes';
import { EmbedComponent } from './routes/embed/embed.component';
@NgModule({
  declarations: [SandboxComponent, EmbedComponent],
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
    ToastModule,
    ProgressSpinnerModule,
    ProgressBarModule,
  ],
  providers: [provideClientHydration(), MessageService],
  exports: [],
  bootstrap: [SandboxComponent],
})
export class SandboxModule {}
