import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { generateLoanOffers } from './quote-calculator.utils';

export interface QuoteForm {
  loanAmount: number;
  loanDuration: number;
  monthlyIncome: number;
  creditScore: number;
}

export interface LoanProduct extends QuoteForm {
  monthlyPaymentMin: number;
  monthlyPaymentMax: number;
  hasCollateral: boolean;
  rate: number;
  apr: number;
  isBonus: boolean;
}

@Component({
  selector: 'app-quote-calculator',
  templateUrl: './quote-calculator.component.html',
  styleUrl: './quote-calculator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCalculatorComponent implements OnInit {
  public quoteFrm = this.fb.group({
    loanAmount: [6000],
    loanDuration: [48],
    monthlyIncome: [4000],
    creditScore: [650],
  });

  public loanProductsSrc$ = this.quoteFrm.valueChanges.pipe(
    startWith(this.quoteFrm.value),
    debounceTime(100),
    map((data) => generateLoanOffers(data as QuoteForm)) // TODO
  );

  public loanProducts$ = this.loanProductsSrc$.pipe(
    map((products) => products.filter((p) => !p.isBonus))
  );

  public loanProductsBonus$ = this.loanProductsSrc$.pipe(
    map((products) => products.filter((p) => p.isBonus))
  );

  @Output() productSelected = new EventEmitter<LoanProduct>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
