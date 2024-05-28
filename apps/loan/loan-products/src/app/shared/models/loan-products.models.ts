/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
export module LoanProductModels {
  export enum SubProductType {
    Credit,
    Noncredit,
  }

  export type SubProducts = (CreditProduct | NonCreditProduct)[];

  export interface LoanProduct {
    id?: string;
    cashOut?: number;
    loanAmount?: number;
    monthlyPayment?: number;
    paymentImpact?: number;
    term?: number;
    apr?: number;
    ndi?: number;
    status?: {
      approved?: boolean;
      customerSelected?: boolean;
      systemGenerated?: boolean;
    };
    vehicles?: string[];
    subProducts?: SubProducts;
  }

  interface SubProduct {
    id: string;
    parentId: string;
    label?: string;
    type?: SubProductType;
    insured?: string;
    term?: number;
    fee?: number;
    dateEffective?: string;
  }

  export interface CreditProduct extends SubProduct {
    type: SubProductType.Credit;
  }

  export interface NonCreditProduct extends SubProduct {
    type: SubProductType.Noncredit;
  }

  export interface Asset {
    id: string;
    label: string;
    assetValue: number;
    totalOwed: number;
    monthlyPayment: number;
    apr: number;
    selected: boolean;
  }
  export interface Creditor {
    id: string;
    label: string;
    totalOwed: number;
    monthlyPayment: number;
    apr: number;
    selected: boolean;
  }
}
