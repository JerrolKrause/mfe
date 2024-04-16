import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { BorrowerFormService } from '../shared/borrower-form.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  public formModel: FormsLib.FormGenerator = [
    {
      label: 'Loan Amount',
      type: 'formField',
      formFieldType: 'number',
      field: 'loanAmount',
      mode: 'currency',
      placeholder: '$6,000.00',
    },
  ];

  constructor(public svc: BorrowerFormService) {}

  public onFormCompleted() {
    this.svc.routeNext();
  }
}
