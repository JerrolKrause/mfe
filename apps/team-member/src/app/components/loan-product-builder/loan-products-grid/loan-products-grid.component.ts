import { SocketService } from '$state-management';
import { Component, Input } from '@angular/core';
import { LoanProduct } from '../../../shared/services/team-member.service';

@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',
})
export class LoanProductsGridComponent {
  @Input() loanProducts: LoanProduct[] | null = [];

  public rowActive: number | null = null;

  constructor(private socket: SocketService) {
    console.log(this.loanProducts);
  }

  public productDelete(index: number) {
    if (!this.loanProducts) {
      return;
    }
    this.loanProducts = this.loanProducts.filter((_p, i) => i !== index);
  }

  public highlightRow(i: number) {
    this.rowActive = i;

    /**
    this.socket.sendMessageToUser(
      'customer',
      JSON.stringify({
        type: 'PRODUCTS_HIGHLIGHTED',
        data: i,
      })
    ); */
  }
}
