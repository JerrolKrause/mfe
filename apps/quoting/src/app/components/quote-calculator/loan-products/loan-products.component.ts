import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LoanProduct } from '../quote-calculator.component';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.component.html',
  styleUrl: './loan-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsComponent {
  @Input() products?: LoanProduct[] | null;
  @Input() showFullDetails = false;
  @Output() productSelected = new EventEmitter<LoanProduct>();
}
