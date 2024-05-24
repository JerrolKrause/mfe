import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { LoanProductModels } from '../../shared/models/loan-products.models';
@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsGridComponent {
  @Input() loanProducts?: LoanProductModels.LoanProduct[] | null = null;

  public columns = [
    { label: '', prop: 'droprow' },
    { label: 'Product', prop: 'product' },
    { label: 'Vehicle', prop: 'vehicle' },
    { label: 'Cash Out', prop: 'cashOut' },
    { label: 'Total<br/> Loan Amount', prop: 'loanAmount' },
    { label: 'Monthly<br/> Payment Range', prop: 'monthlyPayment' },
    { label: 'Payment<br/> Impact', prop: 'paymentImpact' },

    { label: 'APR', prop: 'apr' },
    { label: 'NDI', prop: 'ndi' },
    { label: 'Status', prop: 'status' },
    { label: 'Actions', prop: 'actions' },
  ];

  public SubProductType = LoanProductModels.SubProductType;

  public actions: MenuItem[] = [
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
      command: () => {},
    },
    {
      label: 'Reject',
      icon: 'pi pi-refresh',
      command: () => {},
    },
    {
      label: 'Set Customer Selection',
      icon: 'pi pi-refresh',
      command: () => {},
    },
    {
      label: 'Delete',
      icon: 'pi pi-refresh',
      command: () => {},
    },
  ];

  @Output() modalOpen = new EventEmitter<{
    type: LoanProductModels.SubProductType;
    productId: string;
  }>();

  expandedRows: Record<string, boolean> = {};

  expandAll() {
    if (!this.loanProducts) {
      return;
    }
    this.expandedRows = this.loanProducts.reduce(
      (acc, p) => (acc[p.id ?? ''] = true) && acc,
      {} as any
    ); // TODO
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    console.log('onRowExpand', event);
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    console.log('onRowCollapse', event);
  }
}
