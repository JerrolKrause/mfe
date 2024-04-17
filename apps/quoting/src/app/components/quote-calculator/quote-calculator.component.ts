import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { LoanCalculator } from './quote-calculator.models';
import { generateLoanOffers } from './quote-calculator.utils';

@Component({
  selector: 'app-quote-calculator',
  templateUrl: './quote-calculator.component.html',
  styleUrl: './quote-calculator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCalculatorComponent implements OnInit {
  /** Quote Form
  public quoteFrm = this.fb.group({
    loanAmount: [6000],
    loanDuration: [48],
    monthlyIncome: [4000],
    creditScore: [650],
  });
*/
  public loanQuote$ = new BehaviorSubject<LoanCalculator.Quote | null>(null);

  public loanProductsSrc$ = this.loanQuote$.pipe(
    filter((f) => !!f), // Don't allow nill values through
    tap((quote) => (quote ? this.quoteChanged.emit(quote) : null)), // Emit quote form changes to parent
    // mergeMap(quote => this.http.get('')), // Make HTTP call to get loan offers. Will still need map function
    map((quote) => generateLoanOffers(quote)) // Remove when API is available
  );

  public loanProducts$ = this.loanProductsSrc$.pipe(
    map((products) => products.filter((p) => !p.isBonus))
  );

  public loanProductsBonus$ = this.loanProductsSrc$.pipe(
    map((products) => products.filter((p) => p.isBonus))
  );

  // Emit values to parent
  @Output() quoteChanged = new EventEmitter<LoanCalculator.Quote>();
  @Output() productSelected = new EventEmitter<LoanCalculator.LoanProduct>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * When the quote form data changes
   * @param quote
   */
  public quoteFormChanged(quote: LoanCalculator.Quote) {
    this.loanQuote$.next(quote);
  }
}
