import { LoanCalculator } from '$quote-calculator';
import { AppStorageService } from '$shared';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Subscription, filter, take } from 'rxjs';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  providers: [ConfirmationService],
})
export class QuoteComponent implements OnInit, OnDestroy {
  public isDisabled = true;

  public quoteFormDefaults$ =
    new BehaviorSubject<Partial<LoanCalculator.Quote> | null>(null);
  public ranges$ = new BehaviorSubject<Partial<LoanCalculator.Ranges> | null>(
    null
  );

  public product$ = new BehaviorSubject<LoanCalculator.Product | null>({
    isSecured: true,
    cashOut: 18500,
    loanAmount: 22100,
    monthlyPayment: 432,
    term: 66,
    apr: 16.16,
    vehicle: ['2020 RAV4'],
    paymentImpact: 250,
    ndi: 0,
  });

  // Used to prev/next the current offer
  public index = 0;

  public isUpdating = false;

  private sub: Subscription | null = null;

  constructor(
    private quoteSvc: QuotingService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.sub = this.storage.quoteActive$
      .pipe(filter((x) => !!x))
      .subscribe((quoteActive) => {
        console.log(quoteActive);
        this.product$.next({
          isSecured: true,
          cashOut: quoteActive?.cashOut ?? 0,
          loanAmount: 22100,
          monthlyPayment: 432,
          term: 66,
          apr: 16.16,
          vehicle: ['2020 RAV4'],
          paymentImpact: 250,
          ndi: 0,
        });
      });

    /**
    this.socket.onMessageReceived((msg) => {
      const data = JSON.parse(msg);
      if (QUOTE_FORM_ACTIONS.PRODUCTS_UPDATE(data)) {
        this.quoteSvc.loanProducts$.next(data.payload);
      }
      if (QUOTE_FORM_ACTIONS.PRODUCT_CHANGE.match(data)) {
        this.ranges$.next({
          cashOut: {
            max: data.payload?.loanOptions.cashOutMax ?? 15000,
          },
          loanAmount: {
            max: data.payload?.loanOptions.loanAmountMax ?? 15000,
          },
        });

        this.quoteFormDefaults$.next({ ndi: data.payload?.ndi ?? 0 });
        this.product$.next({
          isSecured: !!(
            data.payload?.productType === 0 || data.payload?.productType === 1
          ),
          cashOut: data.payload?.systemDecision ?? 0,
          loanAmount: data.payload?.totalAdvance ?? 0,
          monthlyPayment: data.payload?.monthlyPayment ?? 0,
          term: data.payload?.term ?? 24,
          apr: data.payload?.apr ?? 0,
          vehicle: [data.payload?.productDescription ?? ''],
          paymentImpact: data.payload?.paymentImpact ?? 0,
          ndi: data.payload?.ndi ?? 0,
        });
      }
      // When loan products received
      if (QUOTE_FORM_ACTIONS.PRODUCTS_UPDATE(data)) {
        this.quoteSvc.loanProducts$.next(data.payload);
      }
    }); **/
  }

  public prev() {
    this.quoteSvc.loanProducts$.pipe(take(1)).subscribe((products) => {
      const next = products[this.index - 1];

      this.product$.next({
        isSecured: !!(next?.productType === 0 || next?.productType === 1),
        cashOut: next?.systemDecision ?? 0,
        loanAmount: next?.totalAdvance ?? 0,
        monthlyPayment: next?.monthlyPayment ?? 0,
        term: next?.term ?? 24,
        apr: next?.apr ?? 0,
        vehicle: [next?.productDescription ?? ''],
        paymentImpact: next?.paymentImpact ?? 0,
        ndi: next?.ndi ?? 0,
      });

      this.index = this.index - 1;
    });
  }

  public next() {
    this.quoteSvc.loanProducts$.pipe(take(1)).subscribe((products) => {
      const next = products[this.index + 1];
      this.product$.next({
        isSecured: !!(next?.productType === 0 || next?.productType === 1),
        cashOut: next?.systemDecision ?? 0,
        loanAmount: next?.totalAdvance ?? 0,
        monthlyPayment: next?.monthlyPayment ?? 0,
        term: next?.term ?? 24,
        apr: next?.apr ?? 0,
        vehicle: [next?.productDescription ?? ''],
        paymentImpact: next?.paymentImpact ?? 0,
        ndi: next?.ndi ?? 0,
      });

      this.index = this.index + 1;
    });
  }

  /**
   * When quote form is changed, notify agent
   * @param quote
   */
  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    this.storage.quote = quote ?? null;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
