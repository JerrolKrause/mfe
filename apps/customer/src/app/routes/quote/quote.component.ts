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

  public isUpdating = false;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.onMessageReceived((msg) => {
      const data = JSON.parse(msg);
      if (QUOTE_FORM_ACTIONS.TM_QUOTE_CHANGED.match(data)) {
        if (this.isUpdating) {
          return;
        }
        console.log(data);
        this.quoteFormDefaults$.next({
          cashOut: data.payload?.userSelection?.cashOut?.value,
          loanAmount: data.payload?.userSelection?.loanAmount?.value,
          loanDuration: data.payload?.userSelection?.term?.value,
          monthlyPayment: data.payload?.userSelection?.monthlyPayment?.value,
        });
        this.ranges$.next({
          cashOut: {
            min: data.payload?.cashOut?.minValue,
            max: data.payload?.cashOut?.maxValue,
            allowRange: data.payload?.cashOut?.allowRange,
          },
          loanAmount: {
            min: data.payload?.loanAmount?.minValue,
            max: data.payload?.loanAmount?.maxValue,
            allowRange: data.payload?.loanAmount?.allowRange,
          },
          loanDuration: {
            min: data.payload?.term?.minValue,
            max: data.payload?.term?.maxValue,
            allowRange: data.payload?.term?.allowRange,
          },
          monthlyPayment: {
            min: data.payload?.monthlyPayment?.minValue,
            max: data.payload?.monthlyPayment?.maxValue,
            allowRange: data.payload?.monthlyPayment?.allowRange,
          },
        });
      }
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
