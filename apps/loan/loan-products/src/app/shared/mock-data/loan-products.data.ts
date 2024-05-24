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
    },
    vehicles: ['2020 RAV4'],
    subProducts: [],
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
];

export const creditors = [
  { label: 'DISCOVER FIN SVCS', totalOwed: 673, monthlyPayment: 33, apr: 29 },
  { label: 'BANK CREDIT CARD', totalOwed: 6430, monthlyPayment: 33, apr: 18 },
  {
    label: 'ULTRAMAR DIAMOND S',
    totalOwed: 1250,
    monthlyPayment: 45,
    apr: 21,
  },
  { label: 'EXXON/MBGA', totalOwed: 345, monthlyPayment: 30, apr: 14 },
];

export const assets = [
  { label: '2020 TOYOTA RAV4', totalOwed: 36000 },
  { label: '2010 CHEVROLET SILVERADO', totalOwed: 10905 },
];
