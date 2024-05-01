// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
export module LoanCalculator {
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

  export type Ranges = {
    [K in keyof Quote]?: {
      min?: number | null;
      max?: number | null;
      step?: number | null;
      allowRange?: boolean | null;
    } | null;
  };

  export interface Product {
    cashOut: number;
    monthlyPayment: number;
    isSecured: boolean;
    loanAmount: number;
    term: number;
    apr: number;
    vehicle: string[];
  }

  export interface LoanProduct {
    monthlyPaymentMin: number;
    monthlyPaymentMax: number;
    hasCollateral: boolean;
    loanDuration: number;
    rate: number;
    apr: number;
    isBonus: boolean;
  }
}
