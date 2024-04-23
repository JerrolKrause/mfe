import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface LPState {}

@Injectable({ providedIn: 'root' })
export class TeamMemberService {
  public state$ = new BehaviorSubject<LPState>({});

  public creditors = [
    { label: 'DISCOVER FIN SVCS', totalOwed: 673, monthlyPayment: 33 },
    { label: 'BANK CREDIT CARD', totalOwed: 643, monthlyPayment: 33 },
    { label: 'ULTRAMAR DIAMOND S', totalOwed: 125, monthlyPayment: 45 },
    { label: 'EXXON/MBGA', totalOwed: 145, monthlyPayment: 30 },
  ];

  public assets = [
    { label: '2020 TOYOTA RAV4', totalOwed: 36000 },
    { label: '2010 CHEVROLET SILVERADO', totalOwed: 10905 },
  ];

  public loanProductTypes = [
    { label: 'DA Free & Clear', productTypeId: 0, qty: 1 },
    { label: 'Personal Loan Secured', productTypeId: 1, qty: 3 },
    { label: 'Personal Loan Partial', productTypeId: 2, qty: 1 },
    { label: 'Personal Loan Unsecured', productTypeId: 3, qty: 1 },
  ];

  public loanProducts = [
    {
      productDescription: '2020 RAV4',
      productType: 0,
      systemDecision: 18500,
      baseAdvance: 43200,
      ltv: 120,
      term: 66,
      totalAdvance: 43200,
      monthlyPayment: '1267-1350',
      apr: 27.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
    },
    {
      productDescription: 'MULTI VEHICLE',
      productType: 1,
      systemDecision: 18500,
      baseAdvance: 43200,
      ltv: 120,
      term: 66,
      totalAdvance: 43200,
      monthlyPayment: '1267-1350',
      apr: 27.16,
      lti: 95,
      ndi: 1325,
      pti: 36,
    },
  ];
}
