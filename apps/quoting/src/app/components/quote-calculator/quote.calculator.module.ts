import { FormsLibModule } from '$forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { QuoteCalculatorComponent } from './quote-calculator.component';

@NgModule({
  declarations: [QuoteCalculatorComponent],
  imports: [
    CommonModule,
    FormsLibModule,
    CardModule,
    SliderModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [],
  exports: [QuoteCalculatorComponent],
})
export class QuoteCalculatorModule {}
