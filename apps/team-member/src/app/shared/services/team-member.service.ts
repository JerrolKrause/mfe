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
  loanOptions: {
    cashOutMax: number;
    loanAmountMax: number;
  };
  systemQuote: boolean;
  status: 'error' | null;
}

@Injectable({ providedIn: 'root' })
export class TeamMemberService {
  public creditors = [
    { label: 'DISCOVER FIN SVCS', totalOwed: 673, monthlyPayment: 33, apr: 29 },
    { label: 'BANK CREDIT CARD', totalOwed: 6430, monthlyPayment: 33, apr: 18 },
    {
      label: 'ULTRAMAR DIAMOND S',
      totalOwed: 1250,
      monthlyPayment: 45,
      apr: 21,
    },
    { label: 'EXXON/MBGA', totalOwed: 345, monthlyPayment: 30, apr: 14 },
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
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: null,
    },
    {
      productDescription: 'MULTI VEHICLE',
      productType: 1,
      systemDecision: 19200,
      baseAdvance: 5000,
      ltv: 120,
      term: 54,
      totalAdvance: 24200,
      monthlyPayment: 455,
      apr: 17.16,
      lti: 95,
      ndi: 1211,
      pti: 36,
      paymentImpact: 175,
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: null,
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 1,
      systemDecision: 8500,
      baseAdvance: 6000,
      ltv: 120,
      term: 54,
      totalAdvance: 12100,
      monthlyPayment: 125,
      apr: 22.16,
      lti: 95,
      ndi: 980,
      pti: 36,
      paymentImpact: -52,
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: null,
    },
    {
      productDescription: '2020 RAV4',
      productType: 1,
      systemDecision: 7200,
      baseAdvance: 3500,
      ltv: 120,
      term: 54,
      totalAdvance: 14500,
      monthlyPayment: 140,
      apr: 23.46,
      lti: 95,
      ndi: 250,
      pti: 36,
      paymentImpact: -180,
      loanOptions: {
        cashOutMax: 8500,
        loanAmountMax: 8500,
      },
      systemQuote: false,
      status: 'error',
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 2,
      systemDecision: 4500,
      baseAdvance: 5200,
      ltv: 120,
      term: 66,
      totalAdvance: 9100,
      monthlyPayment: 185,
      apr: 25.22,
      lti: 95,
      ndi: 325,
      pti: 36,
      paymentImpact: -222,
      loanOptions: {
        cashOutMax: 6000,
        loanAmountMax: 6000,
      },
      systemQuote: false,
      status: null,
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
      ndi: -220,
      pti: 36,
      paymentImpact: -380,
      loanOptions: {
        cashOutMax: 3000,
        loanAmountMax: 3000,
      },
      systemQuote: false,
      status: null,
    },
  ];
}

/**
 * Generates a random number within a specified range based on a base number and a percentage.
 * The function calculates the range as ± the percentage of the base number and returns a random number within that range.
 *
 * @param baseNumber The base number to calculate the range from.
 * @param percentage The percentage to calculate the plus and minus range.
 * @returns A random number within the calculated range.
 */
function getRandomNumberInRange(
  baseNumber: number,
  percentage: number
): number {
  const range = baseNumber * (percentage / 100);
  const min = baseNumber - range;
  const max = baseNumber + range;
  return Math.random() * (max - min) + min;
}
