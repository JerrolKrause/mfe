/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
export module LoanProductModels {
  export enum SubProductType {
    Credit,
    Noncredit,
  }

  export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

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
    status?: LoanProductStatus;
    vehicles?: any[];
    creditors?: Creditor[];
    subProducts?: SubProducts;
    // Stub properties for form
    payoffs?: number;
    baseCashAdvance?: number;
    fees?: number;
  }

  export interface LoanProductStatus {
    approved?: boolean;
    rejected?: boolean;
    customerSelected?: boolean;
    systemGenerated?: boolean;
    secured?: boolean;
    invalid?: string;
  }

  export type LoanProductForm = Nullable<Partial<LPForm>>;

  interface LPForm extends LoanProduct {
    assets: Asset[];
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
