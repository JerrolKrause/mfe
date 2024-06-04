/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

export module QuoteFormModels {
  export interface Quote {
    loanAmount?: number | null;
    loanDuration?: number | null;
    monthlyIncome?: number | null;
    creditScore?: number | null;
    apr?: number | null;
    collateral?: any | null;
    cashOut?: number | null;
    monthlyPayment?: number | null;
  }

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
  }

  export interface UserSelectionDetail {
    value?: number | null;
    range?: [number | null, number | null];
  }

  export interface UserSelection {
    cashOut?: UserSelectionDetail | null;
    loanAmount?: UserSelectionDetail | null;
    monthlyPayment?: UserSelectionDetail | null;
    term?: UserSelectionDetail | null;
  }

  export interface RangeSetting {
    minValue?: number | null;
    maxValue?: number | null;
    allowRange?: boolean | null;
  }

  export interface LoanOptions {
    userSelection?: UserSelection | null;
    monthlyPayment?: RangeSetting | null;
    loanAmount?: RangeSetting | null;
    cashOut?: RangeSetting | null;
    term?: RangeSetting | null;
  }
}
