import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LoanCalculator } from '../quote-calculator.models';

@Component({
  selector: 'app-loan-product',
  templateUrl: './loan-product.component.html',
  styleUrl: './loan-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductComponent {
  @Input() product?: LoanCalculator.LoanProduct | null;
  @Input() showFullDetails = false;
  @Output() productSelected = new EventEmitter<LoanCalculator.LoanProduct>();
}
