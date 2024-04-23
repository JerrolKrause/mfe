import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public loanProducts: any[] = [
    {
      loanDuration: 48,
      monthlyPaymentMin: 140.63,
      monthlyPaymentMax: 171.88,
      hasCollateral: false,
      rate: 12.5,
      apr: 13,
      isBonus: false,
    },
    {
      loanDuration: 48,
      monthlyPaymentMin: 112.5,
      monthlyPaymentMax: 137.5,
      hasCollateral: true,
      rate: 10,
      apr: 10.5,
      isBonus: false,
    },
    {
      loanDuration: 60,
      monthlyPaymentMin: 108,
      monthlyPaymentMax: 132,
      hasCollateral: false,
      rate: 12,
      apr: 12.5,
      isBonus: true,
    },
    {
      loanDuration: 60,
      monthlyPaymentMin: 90,
      monthlyPaymentMax: 110,
      hasCollateral: true,
      rate: 10,
      apr: 10.5,
      isBonus: true,
    },
  ];
}
