import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { LoanProductsComponent } from './loan-products.component';
import { appRoutes } from './loan-products.routes';

@NgModule({
  declarations: [LoanProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MasterpageModule,
    FormsLibModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [LoanProductsComponent],
})
export class LoanProductsModule {}
