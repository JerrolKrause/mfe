import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterpageModule } from '$masterpage';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MasterpageModule,
    HttpClientModule,
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}
