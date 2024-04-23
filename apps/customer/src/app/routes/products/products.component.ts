import { SocketService } from '$state-management';
import { Component } from '@angular/core';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(private socket: SocketService, public quoteSvc: QuotingService) {}

  ngOnInit(): void {
    this.socket.onMessageReceived((msg) => {
      const payload = JSON.parse(msg) as { type: string; data?: any };
      if (payload.type === 'PRODUCTS_READY') {
        this.quoteSvc.loanProducts$.next(payload.data);
        console.log(payload.data);
      }
    });
  }
}
