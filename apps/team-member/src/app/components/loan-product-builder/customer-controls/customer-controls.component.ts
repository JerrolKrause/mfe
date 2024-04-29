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
      rangeProp: 'cashOutRange',
    },
    {
      label: 'Loan Amount',
      prop: 'loanAmount',
      rangeProp: 'loanAmountRange',
    },
    {
      label: 'Term',
      prop: 'term',
      rangeProp: 'termRange',
    },
  ];
  public controlForm = this.fb.group({
    userSelection: this.fb.group({
      loanAmount: 2000,
      loanAmountRange: this.fb.array([2000, 4000]),
      cashOut: 2000,
      cashOutRange: this.fb.array([2000, 4000]),
      term: 2000,
      termRange: this.fb.array([2000, 4000]),
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
      minValue: 1000,
      maxValue: 15000,
      allowRange: false,
    }),
  });

  constructor(private fb: FormBuilder) {}
}
