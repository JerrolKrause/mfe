import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { generateLoanOffers } from './quote-calculator.utils';

export interface QuoteForm {
  loanAmount: number;
  loanDuration: number;
  monthlyIncome: number;
  creditScore: number;
}

export interface LoanProduct {
  monthlyPaymentMin: number;
  monthlyPaymentMax: number;
  hasCollateral: boolean;
  rate: number;
  apr: number;
}

@Component({
  selector: 'app-quote-calculator',
  templateUrl: './quote-calculator.component.html',
  styleUrl: './quote-calculator.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QuoteCalculatorComponent implements OnInit {
  public quoteFrm = this.fb.group({
    loanAmount: [6000],
    loanDuration: [48],
    monthlyIncome: [4000],
    creditScore: [650],
  });

  public loanProducts$ = this.quoteFrm.valueChanges.pipe(
    startWith(this.quoteFrm.value),
    debounceTime(100),
    map((data) => generateLoanOffers(data))
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanProducts$.subscribe((x) => console.warn(x));
  }
}
