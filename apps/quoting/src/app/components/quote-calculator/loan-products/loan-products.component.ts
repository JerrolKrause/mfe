import { Component, Input } from '@angular/core';
import { LoanProduct } from '../quote-calculator.component';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.component.html',
  styleUrl: './loan-products.component.scss',
})
export class LoanProductsComponent {
  @Input() products?: LoanProduct[] | null;
}
