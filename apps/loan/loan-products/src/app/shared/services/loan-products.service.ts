import { GraphQLStoreCreatorService } from '$state-management';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import {
  assets,
  creditors,
  loanProducts,
} from '../mock-data/loan-products.data';
import {
  LinkDocument,
  LinkQuery,
  PingQueryDocument,
} from '../models/loan-products.graphql.models';
import { LoanProductModels } from '../models/loan-products.models';

export interface LoanProductsState {
  /** Permission toggle for if this is Central working on this loan */
  isCentral: boolean;
  /** Toggled when the customer updates their experience */
  hasCustomerUpdate: boolean;
  /** Is another team member currently working on this loan */
  loanIsBeingWorkedOn: boolean;
  /** Is this loan locked and have certain features disabled */
  isLocked: boolean;
}

@Injectable({ providedIn: 'platform' })
export class LoanProductsService {
  public state$ = new BehaviorSubject<LoanProductsState>({
    isCentral: false,
    hasCustomerUpdate: false,
    loanIsBeingWorkedOn: true,
    isLocked: false,
  });

  public loanProducts$ = new BehaviorSubject<LoanProductModels.LoanProduct[]>(
    loanProducts.map((lp) => this.creditProductsAdd(lp))
  );

  public assets$ = new BehaviorSubject<LoanProductModels.Asset[]>(assets);

  public creditors$ = new BehaviorSubject<LoanProductModels.Creditor[]>(
    creditors
  );

  public pingStore = this.graphSvc.createEntityStore<any>({
    autoLoad: false,
    getQuery: PingQueryDocument,
  });

  public plaidStore = this.graphSvc.createEntityStore<LinkQuery>({
    autoLoad: false,
    getQuery: LinkDocument,
  });

  constructor(private graphSvc: GraphQLStoreCreatorService) {
    /** */
    this.pingStore.getData().subscribe();
    this.plaidStore
      .getData({
        input: {
          customerId: '12345',
          uniqueTrackingCode: '123123',
        },
      })
      .subscribe();
  }

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
        .subscribe((lps) =>
          this.loanProducts$.next([...lps, this.creditProductsAdd(product)])
        );
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

  /**
   * Saves a non-credit product into the loan products array. If the product already exists, it updates it; otherwise, it adds it to the array.
   * @param {LoanProductModels.NonCreditProduct} product - The non-credit product to be saved.
   * @returns {void}
   */
  public nonCreditProductSave(product: LoanProductModels.NonCreditProduct) {
    if (!product?.parentId) {
      return;
    }

    this.loanProducts$.next(
      this.loanProducts$.value.map((lp) => {
        // If the subproducts parent ID matches the current product ID
        if (lp.id === product.parentId) {
          let nonCreditProducts = lp.nonCreditProducts ?? [];
          if (product.id) {
            nonCreditProducts = nonCreditProducts?.map((productSrc) =>
              product.id === productSrc.id ? product : productSrc
            );
          } else {
            nonCreditProducts = [
              ...nonCreditProducts,
              {
                ...product,
                id: String(this.getRandomNumberInRange(1000, 10000000)),
              },
            ];
          }
          return {
            ...lp,
            nonCreditProducts,
          };
        }
        return lp;
      })
    );
  }

  /**
   * Deletes a non-credit product from the loan products.
   * Provides a confirmation dialogue before removing.
   * If the product is found, it is removed from the corresponding loan product's non-credit products array.
   * If the product or its parentId is not provided, or if the product with the specified id is not found, the method does nothing.
   * @param product The non-credit product to be deleted.
   */
  public nonCreditProductDelete(product: LoanProductModels.NonCreditProduct) {
    if (!product?.parentId || !product.id) {
      return;
    }

    const c = confirm(
      'Are you sure you want to delete this non-credit product?'
    );

    if (!c) {
      return;
    }

    this.loanProducts$.next(
      this.loanProducts$.value.map((lp) => {
        if (lp.id === product.parentId) {
          const nonCreditProducts = lp.nonCreditProducts ?? [];
          const updatedNonCreditProducts = nonCreditProducts.filter(
            (p) => p.id !== product.id
          );
          return {
            ...lp,
            nonCreditProducts: updatedNonCreditProducts,
          };
        }
        return lp;
      })
    );
  }

  public modifyLoanAmount(loanAmount: number) {
    this.loanProducts$.pipe(take(1)).subscribe((lps) =>
      this.loanProducts$.next(
        lps.map((l) => ({
          ...l,
          cashOut: (l.cashOut ?? 0) + loanAmount,
          loanAmount: (l.loanAmount ?? 0) + loanAmount,
        }))
      )
    );
  }

  /**
   * Autogenerate credit products which are fixed per loan product
   * @param lp
   * @returns
   */
  private creditProductsAdd(
    lp: LoanProductModels.LoanProduct
  ): LoanProductModels.LoanProduct {
    return {
      ...lp,
      creditProducts: [
        {
          id: '0',
          parentId: lp.id ?? '0',
          type: LoanProductModels.SubProductType.Credit,
          label: 'Life Insurance',
          insured: 'Colleen Denning',
          benefitAmount: lp.loanAmount,
          term: lp.term,
          fee: (lp.loanAmount ?? 0) / 200,
          dateEffective: new Date(),
          selected: true,
        },
        {
          id: '1',
          parentId: lp.id ?? '0',
          type: LoanProductModels.SubProductType.Credit,
          label: 'Disability',
          insured: 'Colleen Denning',
          benefitAmount: lp.loanAmount,
          term: lp.term,
          fee: (lp.loanAmount ?? 0) / 300,
          dateEffective: new Date(),
          selected: true,
        },
        {
          id: '2',
          parentId: lp.id ?? '0',
          type: LoanProductModels.SubProductType.Credit,
          label: 'Unemployment',
          insured: 'Colleen Denning',
          benefitAmount: lp.loanAmount,
          term: lp.term,
          fee: (lp.loanAmount ?? 0) / 600,
          dateEffective: new Date(),
          selected: true,
        },
      ],
    };
  }

  private getRandomNumberInRange(min: number, max: number) {
    const randomNum = Math.random() * (max - min) + min;
    return parseFloat(randomNum.toFixed(2));
  }
}
