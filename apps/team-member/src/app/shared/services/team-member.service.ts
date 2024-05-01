import { Injectable } from '@angular/core';

export interface LoanProduct {
  productDescription: string;
  productType: number;
  systemDecision: number;
  baseAdvance: number;
  ltv: number;
  term: number;
  totalAdvance: number;
  monthlyPayment: number;
  apr: number;
  lti: number;
  ndi: number;
  pti: number;
  paymentImpact: number;
}

@Injectable({ providedIn: 'root' })
export class TeamMemberService {
  public creditors = [
    { label: 'DISCOVER FIN SVCS', totalOwed: 673, monthlyPayment: 33 },
    { label: 'BANK CREDIT CARD', totalOwed: 643, monthlyPayment: 33 },
    { label: 'ULTRAMAR DIAMOND S', totalOwed: 125, monthlyPayment: 45 },
    { label: 'EXXON/MBGA', totalOwed: 145, monthlyPayment: 30 },
  ];

  public assets = [
    { label: '2020 TOYOTA RAV4', totalOwed: 36000 },
    { label: '2010 CHEVROLET SILVERADO', totalOwed: 10905 },
  ];

  public loanProductTypes = [
    { label: 'DA Free & Clear', productTypeId: 0, qty: 1 },
    { label: 'Personal Loan Secured', productTypeId: 1, qty: 3 },
    { label: 'Personal Loan Partial', productTypeId: 2, qty: 1 },
    { label: 'Personal Loan Unsecured', productTypeId: 3, qty: 1 },
  ];

  public loanProducts: LoanProduct[] = [
    {
      productDescription: '2020 RAV4',
      productType: 0,
      systemDecision: 18500,
      baseAdvance: 15000,
      ltv: 120,
      term: 66,
      totalAdvance: 22100,
      monthlyPayment: 432,
      apr: 16.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: 250,
    },
    {
      productDescription: 'MULTI VEHICLE',
      productType: 1,
      systemDecision: 18500,
      baseAdvance: 5000,
      ltv: 120,
      term: 54,
      totalAdvance: 22100,
      monthlyPayment: 50,
      apr: 17.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: 175,
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 1,
      systemDecision: 18500,
      baseAdvance: 5000,
      ltv: 120,
      term: 54,
      totalAdvance: 22100,
      monthlyPayment: 50,
      apr: 22.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: -52,
    },
    {
      productDescription: '2020 RAV4',
      productType: 1,
      systemDecision: 18500,
      baseAdvance: 5000,
      ltv: 120,
      term: 54,
      totalAdvance: 22100,
      monthlyPayment: 50,
      apr: 22.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: -180,
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 2,
      systemDecision: 18500,
      baseAdvance: 18500,
      ltv: 120,
      term: 66,
      totalAdvance: 22100,
      monthlyPayment: 185,
      apr: 23.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: -222,
    },
    {
      productDescription: 'NOTE LOAN',
      productType: 3,
      systemDecision: 2100,
      baseAdvance: 2100,
      ltv: 120,
      term: 42,
      totalAdvance: 22100,
      monthlyPayment: 85,
      apr: 27.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: -380,
    },
  ];
}
