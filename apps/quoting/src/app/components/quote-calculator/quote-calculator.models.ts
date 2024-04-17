// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
export module LoanCalculator {
  export interface Quote {
    loanAmount?: number | null;
    loanDuration?: number | null;
    monthlyIncome?: number | null;
    creditScore?: number | null;
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
