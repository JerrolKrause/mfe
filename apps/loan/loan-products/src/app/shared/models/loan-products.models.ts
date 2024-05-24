/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
export module LoanProductModels {
  export enum SubProductType {
    Credit,
    Noncredit,
  }

  export interface LoanProduct {
    id?: string;
    cashOut?: number;
    loanAmount?: number;
    monthlyPayment?: number;
    paymentImpact?: number;
    term?: number;
    apr?: number;
    ndi?: number;
    status?: {
      approved?: boolean;
      customerSelected?: boolean;
      systemGenerated?: boolean;
    };
    vehicles?: string[];
    subProducts?: any[];
    /**
    productDescription: '2020 RAV4';
    productType: 0;
    systemDecision: 18500;
    baseAdvance: 15000;
    ltv: 120;
    term: 66;
    totalAdvance: 22100;
    monthlyPayment: 432;
    apr: 16.16;
    lti: 95;
    ndi: 1325;
    pti: 36;
    paymentImpact: 250;
    loanOptions: {
      cashOutMax: 15000;
      loanAmountMax: 15000;
    };
    systemQuote: true;
    */
  }
}
