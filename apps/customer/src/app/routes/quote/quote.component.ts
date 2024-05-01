import { LoanCalculator } from '$quote-calculator';
import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  providers: [ConfirmationService],
})
export class QuoteComponent implements OnInit {
  public isDisabled = true;

  public loanGoals: boolean[] = [false, false, false];

  public quoteFormDefaults$ =
    new BehaviorSubject<Partial<LoanCalculator.Quote> | null>(null);
  public ranges$ = new BehaviorSubject<Partial<LoanCalculator.Ranges> | null>(
    null
  );

  public product: LoanCalculator.Product | null = {
    isSecured: true,
    cashOut: 18500,
    loanAmount: 22100,
    monthlyPayment: 432,
    term: 36,
    apr: 17.16,
    vehicle: ['2020 RAV4'],
  };

  public isUpdating = false;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.onMessageReceived((msg) => {
      console.log(msg);
    });
  }

  /**
   * When quote form is changed, notify agent
   * @param quote
   */
  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    this.isUpdating = true;
    this.socket.sendMessageToUser(
      UserIds.teamMember,
      JSON.stringify(QUOTE_FORM_ACTIONS.CUSTOMER_QUOTE_CHANGED(quote ?? null))
    );
    setTimeout(() => (this.isUpdating = false), 250);
  }

  public loanGoalSelection(i: number) {
    this.loanGoals[i] = !this.loanGoals[i];
  }
}
