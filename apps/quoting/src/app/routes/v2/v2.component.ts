import { actionCreator } from '$state-management';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { LoanCalculator } from '../../components/quote-calculator';
import { generateLoanOffers } from '../../components/quote-calculator/quote-calculator.utils';
import { SocketService } from '../../shared/socket-io.service';

export const actions = {
  quoteChanged: actionCreator<LoanCalculator.Quote | null | undefined>(
    'QUOTE_CHANGED'
  ),
  pageChanged: actionCreator<number>('PAGE_CHANGED'),
  loanProductsReady: actionCreator<boolean>('LOAN_PRODUCTS_READY'),
};

@Component({
  selector: 'app-v2',
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V2Component implements OnInit, OnDestroy {
  public page = signal(1);

  public quote: LoanCalculator.Quote | null = null;
  public loanProducts: LoanCalculator.LoanProduct[] = [];

  /**
   * Listens to the window beforeunload event to handle component cleanup.
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(): void {
    this.ngOnDestroy();
  }

  constructor(private socketService: SocketService) {
    this.socketService.registerUser('borrower');
  }
  ngOnInit(): void {
    this.socketService.onMessageReceived((msg) => {
      console.log('Borrower', msg);
      const action = JSON.parse(msg);
      if (actions.loanProductsReady.match(action) && action.payload) {
        const c = confirm(
          'Your Team Member has prepared your loan products, please click yes to be taken to the loan products page'
        );
        if (c) {
          this.pageChange(3);
        }
      }
    });
  }

  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    this.quote = quote ?? null;
    this.loanProducts = generateLoanOffers(quote);

    this.socketService.sendMessageToUser(
      'loan-officer',
      JSON.stringify(actions.quoteChanged(quote))
    );
  }

  public pageChange(page: number) {
    this.page.set(page);
    this.socketService.sendMessageToUser(
      'loan-officer',
      JSON.stringify(actions.pageChanged(page))
    );
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
