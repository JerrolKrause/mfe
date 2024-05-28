import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import {
  assets,
  creditors,
  loanProducts,
} from '../mock-data/loan-products.data';
import { LoanProductModels } from '../models/loan-products.models';

@Injectable({ providedIn: 'root' })
export class LoanProductsService {
  public loanProducts$ = new BehaviorSubject<LoanProductModels.LoanProduct[]>(
    loanProducts
  );

  public assets$ = new BehaviorSubject<LoanProductModels.Asset[]>(assets);

  public creditors$ = new BehaviorSubject<LoanProductModels.Creditor[]>(
    creditors
  );

  constructor() {}

  public loanProductAdd(loanProduct: LoanProductModels.LoanProductForm) {
    // Force type since we're faking an API call
    this.loanProducts$
      .pipe(take(1))
      .subscribe((lps) =>
        this.loanProducts$.next([
          ...lps,
          loanProduct as LoanProductModels.LoanProduct,
        ])
      );
  }
}
