import { QUOTE_FORM_ACTIONS } from '$shared';
import { SocketService } from '$state-management';
import { Component, OnInit } from '@angular/core';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private socket: SocketService, public quoteSvc: QuotingService) {}

  ngOnInit(): void {
    this.socket.onMessageReceived((msg) => {
      const data = JSON.parse(msg);
      if (QUOTE_FORM_ACTIONS.PRODUCTS_UPDATE(data)) {
        this.quoteSvc.loanProducts$.next(data.payload);
        console.log(data.payload);
      }
    });
  }
}
