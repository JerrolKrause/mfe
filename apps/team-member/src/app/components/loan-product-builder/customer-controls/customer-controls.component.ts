import { QUOTE_FORM_ACTIONS, QuoteFormModels, UserIds } from '$shared';
import { SocketService } from '$state-management';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-customer-controls',
  templateUrl: './customer-controls.component.html',
  styleUrl: './customer-controls.component.scss',
})
export class CustomerControlsComponent implements OnInit, OnDestroy {
  @Input() creditors: any[] = [];

  public controls = [
    {
      label: 'Cash Out',
      prop: 'cashOut',
      step: 1000,
      min: 500,
      max: 15000,
    },
    {
      label: 'Loan Amount',
      prop: 'loanAmount',
      step: 1000,
      min: 1000,
      max: 30000,
    },
    {
      label: 'Monthly Payment',
      prop: 'monthlyPayment',
      step: 50,
      min: 50,
      max: 1500,
    },
    {
      label: 'Term',
      prop: 'term',
      step: 6,
      isCurrency: false,
      min: 6,
      max: 84,
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

  public sub: any = null;

  constructor(private fb: FormBuilder, private socket: SocketService) {}

  ngOnInit(): void {
    this.sub = this.controlForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((form) => {
        const frm = form as QuoteFormModels.LoanOptions;
        this.socket.sendMessageToUser(
          UserIds.customer,
          JSON.stringify(QUOTE_FORM_ACTIONS.TM_QUOTE_CHANGED(frm))
        );
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
