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
import { QuoteFormComponent } from './quote-form/quote-form.component';

// Prime Modules
const PRIME = [CardModule, SliderModule, InputTextModule, ButtonModule];

/**
 * Component that provides an interface for calculating and displaying loan offers
 * based on user input. It leverages reactive forms for input handling and emits
 * events for changes and selections.

 * @usage:
 * Place the `app-quote-calculator` selector in the parent component's template
 * where you want the quote calculator functionality. Bind to the `(quoteChanged)`
 * and `(productSelected)` outputs to handle changes and selections respectively.
 *
 * In parent module, import
 * import { QuoteCalculatorModule } from './path/to/quote-calculator.module';
 *
 * Include in imports array of parent module
 * @NgModule({
 *    imports: [
 *      ...
 *      QuoteCalculatorModule,
 *    ],
 *  });
 *
 * HTML:
 * <app-quote-calculator (quoteChanged)="quoteChanged($event)" (productSelected)="productSelected($event)"></app-quote-calculator>
 *
 * TypeScript:
 * ```
 * import { LoanCalculator } from './path/to/quote-calculator.models';
 *
 * class ParentComponent {
 *   // On quote change
 *   quoteChanged(quote: LoanCalculator.Quote) {
 *     console.log('Quote changed:', quote);
 *   }
 *   // When a product is selected
 *   productSelected(product: LoanCalculator.LoanProduct) {
 *     console.log('Product selected:', product);
 *   }
 * }
 * ```
 */
@NgModule({
  declarations: [
    QuoteCalculatorComponent,
    LoanProductComponent,
    LoanProductsComponent,
    QuoteFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, PRIME, IconsModule],
  providers: [],
  exports: [QuoteCalculatorComponent],
})
export class QuoteCalculatorModule {}
