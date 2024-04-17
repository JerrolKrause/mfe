import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoanCalculator } from '../../components/quote-calculator';

@Component({
  selector: 'app-v1',
  templateUrl: './v1.component.html',
  styleUrl: './v1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V1Component {
  /**
   * When quote is changed
   * @param quote
   */
  public quoteChanged(quote: LoanCalculator.Quote) {
    console.log('quoteChanged', quote);
  }

  /**
   * When a product is selected by the user
   * @param product
   */
  public productSelected(product: LoanCalculator.LoanProduct) {
    console.log('productSelected', product);
  }
}
