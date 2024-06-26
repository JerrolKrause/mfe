import { LoanCalculator } from './quote-calculator.models';

/**
 * Generate an array of potential loan offers using mock data
 * @param quote
 * @returns
 */
export const generateLoanOffers = (
  quote?: LoanCalculator.Quote | null
): LoanCalculator.LoanProduct[] => {
  // Nill value, return empty array
  if (!quote) {
    return [];
  }

  const products = [
    generateLoanProduct(quote),
    generateLoanProduct(quote, true),
  ];

  if (quote.loanDuration && quote.loanDuration < 84) {
    products.push(
      generateLoanProduct(
        { ...quote, loanDuration: quote.loanDuration + 12 },
        false,
        true
      )
    );
    products.push(
      generateLoanProduct(
        { ...quote, loanDuration: quote.loanDuration + 12 },
        true,
        true
      )
    );
  }
  return products.filter((p): p is LoanCalculator.LoanProduct => p !== null);
};

/**
 * Generate a single loan offer based in input parameters using mock data
 * @param quote
 * @param hasCollateral
 * @param isBonus
 * @returns
 */
const generateLoanProduct = (
  quote: LoanCalculator.Quote,
  hasCollateral = false,
  isBonus = false
): LoanCalculator.LoanProduct | null => {
  if (
    !quote.creditScore ||
    !quote.loanAmount ||
    !quote.monthlyIncome ||
    !quote.loanDuration
  ) {
    return null;
  }
  const baseRate = 0.05; // Basic loan interest rate
  const creditScoreImpact =
    quote.creditScore >= 750 ? -0.02 : quote.creditScore >= 700 ? -0.01 : 0;
  const riskRate = quote.creditScore < 650 ? 0.1 : 0.05;

  // Sliding scale for collateralRate based on loan amount relative to income over loan duration
  const incomeMultiplier =
    quote.loanAmount / (quote.monthlyIncome * quote.loanDuration);
  // const collateralRate = incomeMultiplier > 1 ? 0.07 : 0.03 + 0.04 * incomeMultiplier; // Scale between 0.03 to 0.07
  const collateralRate = hasCollateral ? 0 : 0.04 * incomeMultiplier * 10;
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
    loanDuration: quote.loanDuration,
    monthlyPaymentMin,
    monthlyPaymentMax,
    hasCollateral,
    rate,
    apr,
    isBonus,
  };
};
