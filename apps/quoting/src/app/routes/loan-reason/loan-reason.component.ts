import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { BorrowerFormService } from '../../shared/borrower-form.service';

@Component({
  selector: 'app-loan-reason',
  templateUrl: './loan-reason.component.html',
  styleUrl: './loan-reason.component.scss',
})
export class LoanReasonComponent {
  public formModel: FormsLib.FormGenerator = [
    {
      type: 'formField',
      formFieldType: 'selectButton',
      field: 'loanReason',

      options: [
        {
          label: 'Get Out Of Debt',
          value: 0,
        },
        {
          label: 'Medical Expenses',
          value: 1,
        },
        {
          label: 'Vacation',
          value: 2,
        },
        {
          label: 'Other',
          value: 3,
        },
      ],
    },
  ];

  constructor(public svc: BorrowerFormService) {}

  public onFormCompleted() {
    this.svc.routeNext();
  }
}
