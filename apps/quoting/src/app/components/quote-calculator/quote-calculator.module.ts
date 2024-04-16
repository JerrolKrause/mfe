import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { LoanProductComponent } from './loan-product/loan-product.component';
import { LoanProductsComponent } from './loan-products/loan-products.component';
import { QuoteCalculatorComponent } from './quote-calculator.component';

@NgModule({
  declarations: [
    QuoteCalculatorComponent,
    LoanProductComponent,
    LoanProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsLibModule,
    CardModule,
    SliderModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    IconsModule,
  ],
  providers: [],
  exports: [QuoteCalculatorComponent],
})
export class QuoteCalculatorModule {}
