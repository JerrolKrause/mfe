import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterpageModule } from '$masterpage';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

import { FormsLibModule } from '$forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

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
    PasswordModule,
    InputTextModule,
    FormsLibModule,
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}
