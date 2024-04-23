import { LoanCalculator } from '$quote-calculator';
import { SocketService } from '$state-management';
import { Component, OnInit } from '@angular/core';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent implements OnInit {
  public isDisabled = true;

  constructor(
    private socket: SocketService,
    private quoteSvc: QuotingService
  ) {}

  ngOnInit(): void {
    this.socket.onMessageReceived((msg) => {
      const payload = JSON.parse(msg) as { type: string; data?: any };
      if (payload.type === 'PRODUCTS_READY') {
        this.isDisabled = false;
        this.quoteSvc.loanProducts$.next(payload.data);
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
