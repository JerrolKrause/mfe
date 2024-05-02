import { actionCreator } from '$state-management';
import { QuoteFormModels } from './quote-form.models';

export enum UserIds {
  customer = 'customer',
  teamMember = 'team-member',
}

export const QUOTE_FORM_ACTIONS = {
  TM_QUOTE_CHANGED:
    actionCreator<Partial<QuoteFormModels.LoanOptions>>('TM_QUOTE_CHANGED'),
  CUSTOMER_QUOTE_CHANGED: actionCreator<QuoteFormModels.Quote | null>(
    'CUSTOMER_QUOTE_CHANGED'
  ),
  PRODUCTS_READY: actionCreator<any[]>('PRODUCTS_READY'),
  PRODUCT_CHANGE: actionCreator<QuoteFormModels.LoanProduct | null>(
    'PRODUCT_CHANGE'
  ),
};
