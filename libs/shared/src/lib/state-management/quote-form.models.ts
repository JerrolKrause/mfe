/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

export module QuoteFormModels {
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
