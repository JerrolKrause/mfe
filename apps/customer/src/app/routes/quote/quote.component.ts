import { LoanCalculator } from '$quote-calculator';
import { SocketService } from '$state-management';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  providers: [ConfirmationService],
})
export class QuoteComponent implements OnInit {
  public isDisabled = true;

  constructor(
    private socket: SocketService,
    private quoteSvc: QuotingService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socket.sendMessageToUser(
      'team-member',
      JSON.stringify({ type: 'LOCATION_CHANGE', data: 'Loan Preferences' })
    );
    this.socket.sendMessageToUser(
      'team-member',
      JSON.stringify({
        type: 'CUSTOMER_CONNECTED',
      })
    );

    this.socket.onMessageReceived((msg) => {
      const payload = JSON.parse(msg) as { type: string; data?: any };
      if (payload.type === 'PRODUCTS_READY') {
        this.isDisabled = false;
        this.quoteSvc.loanProducts$.next(payload.data);
        this.confirmationService.confirm({
          //target: event.target as EventTarget,
          message:
            'Your loan products are now ready for review,<br/> would you like to view them now?',
          header: 'Loan Products Ready',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: 'none',
          rejectIcon: 'none',
          acceptLabel: 'Yes Please!',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => this.router.navigate(['/products']),
          reject: () => {
            //
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
    if (this.quoteSvc.agentId) {
      this.socket.sendMessageToUser(
        'team-member',
        JSON.stringify({
          type: 'PREF_CHANGE',
          data: quote,
        })
      );
    }
  }
}
