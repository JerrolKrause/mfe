import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { LoanProductModels } from '../../shared/models/loan-products.models';
@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsGridComponent implements OnChanges {
  @Input() loanProducts?: LoanProductModels.LoanProduct[] | null = null;

  public columns = [
    { label: '', prop: 'droprow' },
    { label: 'Product', prop: 'product' },
    { label: 'Vehicle', prop: 'vehicle' },
    { label: 'Cash Out', prop: 'cashOut' },
    { label: 'Total<br/> Loan Amount', prop: 'loanAmount' },
    { label: 'Monthly<br/> Payment Range', prop: 'monthlyPayment' },
    { label: 'Payment<br/> Impact', prop: 'paymentImpact' },
    { label: 'Term', prop: 'term' },
    { label: 'APR', prop: 'apr' },
    { label: 'NDI', prop: 'ndi' },
    { label: 'Status', prop: 'status' },
    { label: 'Actions', prop: 'actions' },
  ];

  public SubProductType = LoanProductModels.SubProductType;

  /** Split button menu actions for loan products */
  public actions: MenuItem[][] = this.actionsGenerate(this.loanProducts);

  @Output() modalOpen = new EventEmitter<{
    type: LoanProductModels.SubProductType;
    productId: string;
  }>();

  ngOnChanges(changes: SimpleChanges): void {
    // When loan products change, generate action menus
    if (this.loanProducts && changes['loanProducts']) {
      this.actions = this.actionsGenerate(this.loanProducts);
    }
  }

  expandedRows: Record<string, boolean> = {};

  /**
   * Expand all rows
   * @returns
   */
  expandAll() {
    if (!this.loanProducts) {
      return;
    }
    this.expandedRows = this.loanProducts.reduce(
      (acc, p) => (acc[p.id ?? ''] = true) && acc,
      {} as any
    ); // TODO
  }

  /**
   * Generate action menus for each loan product
   * @param loanProducts
   * @returns
   */
  private actionsGenerate(
    loanProducts?: LoanProductModels.LoanProduct[] | null
  ): MenuItem[][] {
    if (!loanProducts?.length) {
      return [];
    }
    return loanProducts.map((lp) => {
      return [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
        },
        {
          label: 'Escalate',
          icon: 'pi pi-exclamation-triangle',
        },
        {
          label: 'Approve',
          icon: 'pi pi-check',
          command: () => {
            console.log(lp);
          },
        },
        {
          label: 'Reject',
          icon: 'pi pi-times',
          command: () => {
            console.log(lp);
          },
        },
        {
          label: 'Set Customer Selection',
          icon: 'pi pi-check-square',
          command: () => {
            console.log(lp);
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            console.log(lp);
          },
        },
      ];
    });
  }

  public collapseAll() {
    this.expandedRows = {};
  }

  public onRowExpand(event: TableRowExpandEvent) {
    console.log('onRowExpand', event);
  }

  public onRowCollapse(event: TableRowCollapseEvent) {
    console.log('onRowCollapse', event);
  }
}
