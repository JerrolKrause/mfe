import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import {
  assets,
  creditors,
  loanProducts,
} from '../mock-data/loan-products.data';
import { LoanProductModels } from '../models/loan-products.models';

export interface LoanProductsState {
  isCentral: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoanProductsService {
  public state$ = new BehaviorSubject<LoanProductsState>({
    isCentral: false,
  });

  public loanProducts$ = new BehaviorSubject<LoanProductModels.LoanProduct[]>(
    loanProducts
  );

  public assets$ = new BehaviorSubject<LoanProductModels.Asset[]>(assets);

  public creditors$ = new BehaviorSubject<LoanProductModels.Creditor[]>(
    creditors
  );

  constructor() {}

  /**
   * Change state of the app
   * @param stateNew
   */
  public stateChange(stateNew: Partial<LoanProductsState>) {
    this.state$
      .pipe(take(1))
      .subscribe((stateOld) => this.state$.next({ ...stateOld, ...stateNew }));
  }

  /**
   * Add a loan product to the mock API
   * @param lp
   */
  public loanProductAdd(lp: LoanProductModels.LoanProductForm) {
    if (lp.id) {
      this.loanProducts$.pipe(take(1)).subscribe((lps) => {
        const newProducts = lps.map((l) =>
          l.id === lp.id ? { ...l, ...lp } : l
        ) as LoanProductModels.LoanProduct[];
        this.loanProducts$.next(newProducts);
      });
    } else {
      // This is all stub since this will be coming from the API
      const vehicles = lp.assets?.filter((v) => v.selected).map((v) => v.label);
      const payoff: number = (lp as any).creditors
        .filter((c: any) => c.selected)
        .map((c: any) => c.totalOwed)
        .reduce((a: number, b: number) => a + b, 0);
      const product = {
        ...lp,
        id: String(this.getRandomNumberInRange(100, 1000000)),
        apr: this.getRandomNumberInRange(14, 24),
        monthlyPayment: this.getRandomNumberInRange(200, 400),
        paymentImpact: this.getRandomNumberInRange(50, 300),
        ndi: this.getRandomNumberInRange(100, 1200),
        loanAmount: (lp.cashOut ?? 0) + payoff,
        vehicles: (vehicles ?? [])?.length > 1 ? 'MULTI-VEHICLE' : vehicles,
        status: {},
      } as LoanProductModels.LoanProduct;

      // Force type since we're faking an API call
      this.loanProducts$
        .pipe(take(1))
        .subscribe((lps) => this.loanProducts$.next([...lps, product]));
    }
  }

  /**
   * Change loan product status
   * @param id
   * @param status
   */
  public loanProductStatusChange(
    id: string,
    status: Partial<LoanProductModels.LoanProductStatus>
  ) {
    this.loanProducts$.pipe(take(1)).subscribe((lps) => {
      const newProducts = lps.map((l) => {
        if (l.id === id) {
          return {
            ...l,
            status: {
              ...l.status,
              ...status,
            },
          };
        }
        return l;
      });
      this.loanProducts$.next(newProducts);
    });
  }

  /**
   *
   * @param id
   */
  public loanProductDelete(id: string) {
    const c = confirm('Are you sure you want to delete this loan product?');
    if (c) {
      this.loanProducts$
        .pipe(take(1))
        .subscribe((lps) =>
          this.loanProducts$.next(lps.filter((lp) => lp.id !== id))
        );
    }
  }

  getRandomNumberInRange(min: number, max: number): number {
    const randomNum = Math.random() * (max - min) + min;
    return parseFloat(randomNum.toFixed(2));
  }

  public modifyAll(lp: Partial<LoanProductModels.LoanProduct>) {
    this.loanProducts$
      .pipe(take(1))
      .subscribe((lps) =>
        this.loanProducts$.next(lps.map((l) => ({ ...l, ...lp })))
      );
  }
}
