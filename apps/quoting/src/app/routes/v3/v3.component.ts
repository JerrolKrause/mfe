import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoanCalculator } from '../../components/quote-calculator';
import { generateLoanOffers } from '../../components/quote-calculator/quote-calculator.utils';
import { SocketService } from '../../shared/socket-io.service';
import { actions } from '../v2/v2.component';

@Component({
  selector: 'app-v3',
  templateUrl: './v3.component.html',
  styleUrl: './v3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V3Component implements OnInit, OnDestroy {
  public page = signal(1);

  public formDefaults$ = new BehaviorSubject<LoanCalculator.Quote | null>({
    loanAmount: 6000,
    loanDuration: 48,
    monthlyIncome: 4000,
    creditScore: 650,
    apr: 21,
    collateral: 'Yes',
  });
  public quoteSelected: LoanCalculator.Quote | null = null;
  public loanProducts: LoanCalculator.LoanProduct[] = [];

  /**
   * Listens to the window beforeunload event to handle component cleanup.
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(): void {
    this.ngOnDestroy();
  }

  constructor(private socketService: SocketService) {
    this.socketService.registerUser('loan-officer');
  }
  ngOnInit(): void {
    this.socketService.onMessageReceived((msg) => {
      const action = JSON.parse(msg);
      console.warn(msg);
      if (actions.quoteChanged.match(action) && action.payload) {
        this.formDefaults$.next(action.payload);
        this.loanProducts = generateLoanOffers(action.payload);
      } else if (actions.pageChanged.match(action) && action.payload) {
        this.page.set(action.payload);
      }
    });
  }

  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    this.quoteSelected = quote ?? null;
    this.loanProducts = generateLoanOffers(quote);
  }

  public loanProductsReady() {
    this.socketService.sendMessageToUser(
      'borrower',
      JSON.stringify(actions.loanProductsReady(true))
    );
    this.page.set(3);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
