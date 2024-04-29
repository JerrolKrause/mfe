import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-controls',
  templateUrl: './customer-controls.component.html',
  styleUrl: './customer-controls.component.scss',
})
export class CustomerControlsComponent {
  @Input() creditors: any[] = [];

  public controls = [
    {
      label: 'Cash Out',
      prop: 'cashOut',
    },
    {
      label: 'Loan Amount',
      prop: 'loanAmount',
    },
    {
      label: 'Term',
      prop: 'term',
      isCurrency: false,
    },
    {
      label: 'Monthly Payment',
      prop: 'monthlyPayment',
    },
  ];
  public controlForm = this.fb.group({
    userSelection: this.fb.group({
      cashOut: this.fb.group({
        value: 2000,
        range: this.fb.array([2000, 4000]),
      }),
      loanAmount: this.fb.group({
        value: 6000,
        range: this.fb.array([5000, 6000]),
      }),
      monthlyPayment: this.fb.group({
        value: 200,
        range: this.fb.array([100, 300]),
      }),
      term: this.fb.group({
        value: 48,
        range: this.fb.array([36, 48]),
      }),
    }),
    monthlyPayment: this.fb.group({
      minValue: 50,
      maxValue: 1000,
      allowRange: false,
    }),
    loanAmount: this.fb.group({
      minValue: 1000,
      maxValue: 15000,
      allowRange: false,
    }),
    cashOut: this.fb.group({
      minValue: 1000,
      maxValue: 15000,
      allowRange: false,
    }),
    term: this.fb.group({
      minValue: 24,
      maxValue: 60,
      allowRange: false,
    }),
  });

  constructor(private fb: FormBuilder) {}
}
