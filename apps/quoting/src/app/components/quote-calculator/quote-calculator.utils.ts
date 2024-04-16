import { LoanProduct } from './quote-calculator.component';

export const generateLoanOffers = (quote: any): LoanProduct[] => {
  console.log(quote);
  const baseRate = 0.05; // Basic loan interest rate
  const riskRate = quote.creditScore < 650 ? 0.1 : 0.05;
  const collateralRate =
    quote.loanAmount > 0.5 * quote.monthlyIncome * quote.loanDuration
      ? 0.03
      : 0.07;
  console.log(collateralRate);
  const rate = parseFloat(
    ((baseRate + riskRate + collateralRate) * 100).toFixed(8)
  );
  const apr = parseFloat((rate + 0.5).toFixed(8));

  const monthlyPayment = parseFloat(
    ((quote.loanAmount * (rate / 100)) / quote.loanDuration).toFixed(2)
  );
  const monthlyPaymentMin = parseFloat(
    ((monthlyPayment - monthlyPayment * 0.1) * 10).toFixed(2)
  );
  const monthlyPaymentMax = parseFloat(
    ((monthlyPayment + monthlyPayment * 0.1) * 10).toFixed(2)
  );

  return [
    {
      monthlyPaymentMin,
      monthlyPaymentMax,
      hasCollateral: quote.loanAmount > 10000, // Simple collateral condition
      rate,
      apr,
    },
  ];
};
