import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
export class LoanProductsGridComponent implements OnChanges {
  @Input() loanProducts: LoanProduct[] | null = [];

  public items = (index: number) => [
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
      command: () => {
        this.statusChange({
          index: index,
          status: { approved: true },
        });
      },
    },
    {
      label: 'Reject',
      icon: 'pi pi-refresh',
      command: () =>
        this.statusChange({
          index: index,
          status: { rejected: true },
        }),
    },
    {
      label: 'Set Customer Selection',
      icon: 'pi pi-refresh',
      command: () =>
        this.statusChange({
          index: index,
          status: { customerSelected: true },
        }),
    },
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      command: () => {
        this.deleteProduct.emit(index);
      },
      visible: index >= 2,
    },
  ];

  public items3: MenuItem[][] = (this.loanProducts ?? [])?.map((_a, i) =>
    this.items(i)
  );

  public items2: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      command: (event) => {
        this.productDelete(event.index ?? 0);
      },
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

  public creditProducts = [
    {
      product: 'Life Insurance',
      type: 'Quote',
      insuredName: 'Colleen Denning',
      term: '66',
      fee: 499,
      dateStart: '03/11/24',
    },
    {
      product: 'Disability',
      type: 'Quote',
      insuredName: 'Colleen Denning',
      term: '33',
      fee: 599,
      dateStart: '03/11/24',
    },
  ];

  public rowActive: number | null = 0;

  @Output() statusChanged = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  constructor(private socket: SocketService) {
    /**
    setTimeout(() => {
      this.statusChanged.emit('Test');
      this.statusChange('Test');
    }, 1000);
     */
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loanProducts']) {
      this.items3 = (this.loanProducts ?? [])?.map((_a, i) => this.items(i));
    }
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
