import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { QuotingService } from './shared/services/quoting.service';
@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent implements OnInit, OnDestroy {
  constructor(private socket: SocketService, private quoteSvc: QuotingService) {
    this.socket.initialize('http://localhost:3000');
  }

  ngOnInit(): void {
    this.socket.registerUser(UserIds.customer);

    this.socket.onMessageReceived((msg) => {
      const data = JSON.parse(msg);
      if (QUOTE_FORM_ACTIONS.PRODUCTS_UPDATE(data)) {
        this.quoteSvc.loanProducts$.next(data.payload);
      }
      // When loan products received
      if (QUOTE_FORM_ACTIONS.PRODUCTS_UPDATE(data)) {
        this.quoteSvc.loanProducts$.next(data.payload);
      }
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
