
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { routing } from './login.routes';
import { MasterpageModule } from '$libs';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,routing, MasterpageModule ],
  declarations: [LoginComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}
