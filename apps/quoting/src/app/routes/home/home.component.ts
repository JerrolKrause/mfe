import { FormsLib } from '$forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoanCalculator } from '../../components/quote-calculator'; // Import models
import { BorrowerFormService } from '../../shared/borrower-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
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

  constructor(public svc: BorrowerFormService, private router: Router) {}

  public onFormCompleted() {
    this.svc.routeNext();
  }

  /**
   * When quote is changed
   * @param quote
   */
  public quoteFormChanged(quote: LoanCalculator.Quote) {
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
