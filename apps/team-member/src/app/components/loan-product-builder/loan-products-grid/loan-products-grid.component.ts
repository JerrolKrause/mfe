import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import {
  Component,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
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

  public items = (i: number): MenuItem[] => [
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
      command: (event) => {
        this.statusChange({
          index: event.index ?? 0,
          status: { approved: true },
        });
      },
    },
    {
      label: 'Reject',
      icon: 'pi pi-refresh',
      command: (event) =>
        this.statusChange({
          index: event.index ?? 0,
          status: { rejected: true },
        }),
    },
    {
      label: 'Set Customer Selection',
      icon: 'pi pi-refresh',
      command: (event) =>
        this.statusChange({
          index: event.index ?? 0,
          status: { customerSelected: true },
        }),
    },
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      command: (event) => this.productDelete(event.index ?? 0),
      visible: i >= 2,
    },
  ];

  public itemstest: MenuItem[] = [
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
      command: (event) => {
        this.statusChange({
          index: event.index ?? 0,
          status: { approved: true },
        });
      },
    },
    {
      label: 'Reject',
      icon: 'pi pi-refresh',
      command: (event) =>
        this.statusChange({
          index: event.index ?? 0,
          status: { rejected: true },
        }),
    },
    {
      label: 'Set Customer Selection',
      icon: 'pi pi-refresh',
      command: (event) =>
        this.statusChange({
          index: event.index ?? 0,
          status: { customerSelected: true },
        }),
    },
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      command: (event) => this.productDelete(event.index ?? 0),
    },
  ];

  public items2: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      // command: (event) => this.productDelete(event.index ?? 0),
    },
  ];

  public nonCreditProducts = [
    {
      product: 'Auto Plan',
      type: 'Quote',
      insuredName: 'Colleen Denning',
      term: '66',
      fee: 499,
      dateStart: '03/11/24',
    },
    {
      product: 'Home & Auto Plan',
      type: 'Quote',
      insuredName: 'Colleen Denning',
      term: '33',
      fee: 599,
      dateStart: '03/11/24',
    },
    {
      product: 'Silver Safeguard plan',
      type: 'Quote',
      insuredName: 'Colleen Denning',
      term: '66',
      fee: 299,
      dateStart: '03/11/24',
    },
  ];

  public rowActive: number | null = 0;

  public statusChanged = new EventEmitter<any>();

  constructor(private socket: SocketService) {
    setTimeout(() => {
      this.statusChanged.emit('Test');
      this.statusChange('Test');
    }, 1000);
  }

  public productDelete(index: number) {
    if (!this.loanProducts) {
      return;
    }
    const c = confirm('Are you sure you want to delete this loan product?');
    if (c) {
      this.loanProducts = this.loanProducts.filter((_p, i) => i !== index);
    }
  }

  public statusChange(event: any) {
    console.log(event);
    this.statusChanged.emit(event);
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
