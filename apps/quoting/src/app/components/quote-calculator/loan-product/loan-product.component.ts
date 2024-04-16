import { Component, Input } from '@angular/core';
import { LoanProduct } from '../quote-calculator.component';

@Component({
  selector: 'app-loan-product',
  templateUrl: './loan-product.component.html',
  styleUrl: './loan-product.component.scss',
})
export class LoanProductComponent {
  @Input() product?: LoanProduct | null;
}
