import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LoanProduct } from '../quote-calculator.component';

@Component({
  selector: 'app-loan-product',
  templateUrl: './loan-product.component.html',
  styleUrl: './loan-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductComponent {
  @Input() product?: LoanProduct | null;
  @Input() showFullDetails = false;
  @Output() productSelected = new EventEmitter<LoanProduct>();
}
