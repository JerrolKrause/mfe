import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoanCalculator } from '../../components/quote-calculator';
import { generateLoanOffers } from '../../components/quote-calculator/quote-calculator.utils';

@Component({
  selector: 'app-v2',
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V2Component {
  public page = 1;

  public quote: LoanCalculator.Quote | null = null;
  public loanProducts: LoanCalculator.LoanProduct[] = [];

  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    this.quote = quote ?? null;
    this.loanProducts = generateLoanOffers(quote);
  }
}
