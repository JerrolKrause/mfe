import { LoanProductModels } from '../models/loan-products.models';

export const loanProducts: LoanProductModels.LoanProduct[] = [
  {
    id: '1',
    cashOut: 18500,
    loanAmount: 22100,
    monthlyPayment: 432,
    paymentImpact: 250,
    term: 66,
    apr: 16.16,
    ndi: 1325,
    status: {
      systemGenerated: true,
      secured: true,
    },
    vehicles: ['2020 TOYOTA RAV4'],
    creditors: [],
    payoffs: 1288,
    baseCashAdvance: 16000,
    fees: 500,
    creditProducts: [],
    nonCreditProducts: [
      {
        id: '0',
        parentId: '1',
        type: LoanProductModels.SubProductType.Noncredit,
        label: 'Auto Plan',
        benefitAmount: 1000,
        insured: 'Colleen Denning',
        term: 66,
        fee: 49.99,
        dateEffective: '04/11/24',
      },
      {
        id: '1',
        parentId: '1',
        type: LoanProductModels.SubProductType.Noncredit,
        label: 'Silver Safeguard Plan',
        insured: 'Colleen Denning',
        benefitAmount: 750,
        term: 33,
        fee: 9.99,
        dateEffective: '03/08/24',
      },
    ],
  },
  {
    id: '2',
    cashOut: 19200,
    loanAmount: 24200,
    monthlyPayment: 455,
    paymentImpact: 175,
    term: 54,
    apr: 17.28,
    ndi: 1211,
    creditProducts: [],
    nonCreditProducts: [],
    status: {
      systemGenerated: true,
      secured: true,
    },
    vehicles: ['MULTI VEHICLE'],
    creditors: [],
    payoffs: 6588,
    baseCashAdvance: 12110,
    fees: 254,
  },
  {
    id: '3',
    cashOut: 8500,
    loanAmount: 12100,
    monthlyPayment: 125,
    paymentImpact: -52,
    term: 36,
    apr: 22.96,
    ndi: 980,
    status: {
      invalid: `Doesn't meet minumum NDI requirements`,
    },
    vehicles: ['2010 CHEVROLET SILVERADO'],
    payoffs: 674,
    baseCashAdvance: 2300,
    fees: 97,
  },
];

export const creditors: LoanProductModels.Creditor[] = [
  {
    id: '0',
    label: 'DISCOVER FIN SVCS',
    totalOwed: 673,
    monthlyPayment: 33,
    apr: 29,
    selected: false,
  },
  {
    id: '1',
    label: 'BANK CREDIT CARD',
    totalOwed: 6430,
    monthlyPayment: 33,
    apr: 18,
    selected: false,
  },
  {
    id: '2',
    label: 'ULTRAMAR DIAMOND S',
    totalOwed: 1250,
    monthlyPayment: 45,
    apr: 21,
    selected: false,
  },
  {
    id: '3',
    label: 'EXXON/MBGA',
    totalOwed: 345,
    monthlyPayment: 30,
    apr: 14,
    selected: false,
  },
];

export const assets: LoanProductModels.Asset[] = [
  {
    id: '1',
    label: '2020 TOYOTA RAV4',
    assetValue: 36000,
    totalOwed: 0,
    monthlyPayment: 0,
    apr: 0,
    selected: false,
  },
  {
    id: '2',
    label: '2010 CHEVROLET SILVERADO',
    assetValue: 10905,
    totalOwed: 4000,
    monthlyPayment: 0,
    apr: 0,
    selected: false,
  },
];
