import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoanProduct } from '../../../shared/services/team-member.service';

@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoanProductsGridComponent {
  @Input() loanProducts: LoanProduct[] | null = [];

  public items: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Escalate',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Approve',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Reject',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
    },
  ];

  public rowActive: number | null = 0;

  constructor(private socket: SocketService) {}

  public productDelete(index: number) {
    if (!this.loanProducts) {
      return;
    }
    this.loanProducts = this.loanProducts.filter((_p, i) => i !== index);
  }

  public highlightRow(i: number) {
    this.rowActive = i;
    const product = this.loanProducts?.[i];
    if (!product) {
      return;
    }
    this.socket.sendMessageToUser(
      UserIds.customer,
      JSON.stringify(QUOTE_FORM_ACTIONS.PRODUCT_CHANGE(product))
    );
  }
}
