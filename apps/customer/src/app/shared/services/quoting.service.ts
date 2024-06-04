import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { agentId } from '../actions/quoting.actions';

@Injectable({ providedIn: 'root' })
export class QuotingService {
  public loanProducts$ = new BehaviorSubject<any[]>([
    {
      productDescription: '2020 RAV4',
      productType: 0,
      systemDecision: 18500,
      baseAdvance: 15000,
      ltv: 120,
      term: 66,
      totalAdvance: 22100,
      monthlyPayment: 432,
      apr: 16.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
      paymentImpact: 250,
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: {
        approved: true,
        customerSelected: true,
        systemGenerated: true,
      },
    },
    {
      productDescription: 'MULTI VEHICLE',
      productType: 1,
      systemDecision: 19200,
      baseAdvance: 5000,
      ltv: 120,
      term: 54,
      totalAdvance: 24200,
      monthlyPayment: 455,
      apr: 17.16,
      lti: 95,
      ndi: 1211,
      pti: 36,
      paymentImpact: 175,
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: {
        systemGenerated: true,
      },
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 1,
      systemDecision: 8500,
      baseAdvance: 6000,
      ltv: 120,
      term: 54,
      totalAdvance: 12100,
      monthlyPayment: 125,
      apr: 22.16,
      lti: 95,
      ndi: 980,
      pti: 36,
      paymentImpact: -52,
      loanOptions: {
        cashOutMax: 15000,
        loanAmountMax: 15000,
      },
      systemQuote: true,
      status: {
        rejected: true,
      },
    },
    {
      productDescription: '2020 RAV4',
      productType: 1,
      systemDecision: 7200,
      baseAdvance: 3500,
      ltv: 120,
      term: 54,
      totalAdvance: 14500,
      monthlyPayment: 180,
      apr: 23.46,
      lti: 95,
      ndi: 250,
      pti: 36,
      paymentImpact: -135,
      loanOptions: {
        cashOutMax: 8500,
        loanAmountMax: 8500,
      },
      systemQuote: false,
      status: {
        error: true,
      },
    },
    {
      productDescription: '2010 SILVERADO',
      productType: 2,
      systemDecision: 4500,
      baseAdvance: 5200,
      ltv: 120,
      term: 66,
      totalAdvance: 9100,
      monthlyPayment: 222,
      apr: 25.22,
      lti: 95,
      ndi: 325,
      pti: 36,
      paymentImpact: -222,
      loanOptions: {
        cashOutMax: 6000,
        loanAmountMax: 6000,
      },
      systemQuote: false,
      status: {
        error: true,
      },
    },
    {
      productDescription: 'NOTE LOAN',
      productType: 3,
      systemDecision: 2100,
      baseAdvance: 2100,
      ltv: 120,
      term: 42,
      totalAdvance: 22100,
      monthlyPayment: 380,
      apr: 27.16,
      lti: 95,
      ndi: -220,
      pti: 36,
      paymentImpact: -380,
      loanOptions: {
        cashOutMax: 3000,
        loanAmountMax: 3000,
      },
      systemQuote: false,
      status: {
        error: true,
      },
    },
  ]);
  public loanProductsHighlighted$ = new BehaviorSubject<boolean[]>([]);
  public agentId: string | null = '';

  /**
   * On form submit, get mock agent ID
   * @param form
   */
  public submitForm(form: any) {
    if (form) {
      this.agentId = agentId;
    }
  }
}
