import { LoanProduct } from './quote-calculator.component';

export const generateLoanOffers = (quote: any): LoanProduct[] => [
  generateLoanProduct(quote),
  generateLoanProduct({ ...quote, hasCollateral: true }),
];

const generateLoanProduct = (quote: any): LoanProduct => {
  const baseRate = 0.05; // Basic loan interest rate
  const creditScoreImpact =
    quote.creditScore >= 750 ? -0.02 : quote.creditScore >= 700 ? -0.01 : 0;
  const riskRate = quote.creditScore < 650 ? 0.1 : 0.05;

  // Sliding scale for collateralRate based on loan amount relative to income over loan duration
  const incomeMultiplier =
    quote.loanAmount / (quote.monthlyIncome * quote.loanDuration);
  const collateralRate =
    incomeMultiplier > 1 ? 0.07 : 0.03 + 0.04 * incomeMultiplier; // Scale between 0.03 to 0.07

  const rate = parseFloat(
    ((baseRate + riskRate + collateralRate + creditScoreImpact) * 100).toFixed(
      2
    )
  );
  const apr = parseFloat((rate + 0.5).toFixed(2));

  const monthlyPayment = (quote.loanAmount * (rate / 100)) / quote.loanDuration;
  const monthlyPaymentMin = parseFloat(
    ((monthlyPayment - monthlyPayment * 0.1) * 10).toFixed(2)
  );
  const monthlyPaymentMax = parseFloat(
    ((monthlyPayment + monthlyPayment * 0.1) * 10).toFixed(2)
  );

  return {
    monthlyPaymentMin,
    monthlyPaymentMax,
    hasCollateral: quote.loanAmount > 10000,
    rate,
    apr,
  };
};
