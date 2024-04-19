import { LoanCalculator } from '$quote-calculator';
import { actionCreator } from '$state-management';

export const agentId = 'agent1234';
export const borrowerId = 'borrower1234';

export const QUOTE_ACTIONS = {
  QUOTE_CHANGED: actionCreator<LoanCalculator.Quote | null | undefined>(
    'QUOTE_CHANGED'
  ),
};
