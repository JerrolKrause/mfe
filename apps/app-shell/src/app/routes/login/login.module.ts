import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterpageModule } from '$masterpage';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MasterpageModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    MessageModule,
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}
