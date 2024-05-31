import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoanProductsService } from '../../shared/services/loan-products.service';

@Component({
  selector: 'app-modify-loan-products',
  templateUrl: './modify-loan-products.component.html',
  styleUrl: './modify-loan-products.component.scss',
})
export class ModifyLoanProductsComponent {
  public modifyForm = this.fb.group({
    loanAmount: '',
  });

  constructor(private lpSvc: LoanProductsService, private fb: FormBuilder) {}

  public updateLoanAmount() {
    /**
    if (!loanAmount) {
      return;
    }
    this.lpSvc.modifyAll({ loanAmount });
     */
  }
}
