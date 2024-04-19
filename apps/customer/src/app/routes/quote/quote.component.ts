import { LoanCalculator } from '$quote-calculator';
import { SocketService } from '$state-management';
import { Component } from '@angular/core';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  constructor(
    private socket: SocketService,
    private quoteSvc: QuotingService
  ) {}

  /**
   * When quote form is changed, notify agent
   * @param quote
   */
  public quoteFormChanged(quote?: LoanCalculator.Quote | null) {
    if (this.quoteSvc.agentId) {
      this.socket.sendMessageToUser(
        this.quoteSvc.agentId,
        JSON.stringify(quote)
      );
    }
  }
}
