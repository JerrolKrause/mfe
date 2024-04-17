import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LoanCalculator } from '../quote-calculator.models';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.component.html',
  styleUrl: './loan-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsComponent {
  @Input() products?: LoanCalculator.LoanProduct[] | null;
  @Input() showFullDetails = false;
  @Output() productSelected = new EventEmitter<LoanCalculator.LoanProduct>();
}
