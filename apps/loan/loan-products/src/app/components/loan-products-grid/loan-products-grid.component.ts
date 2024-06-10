import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsService } from '../../shared/services/loan-products.service';
@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsGridComponent implements OnChanges {
  @Input() loanProducts?: LoanProductModels.LoanProduct[] | null = null;
  @Input() isLocked?: boolean | null = false;

  public columns = [
    { label: '', prop: 'droprow' },
    { label: 'Type', prop: 'product' },
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
  public actions: MenuItem[][] = this.actionsGenerate(
    this.loanProducts,
    this.isLocked
  );

  public monthlyPaymentRange = signal<number[]>([]);

  @Output() modalOpen = new EventEmitter<{
    parentId: string;
    type: LoanProductModels.SubProductType;
    product?: LoanProductModels.SubProduct | null;
  }>();
  @Output() loanProductEdit = new EventEmitter<LoanProductModels.LoanProduct>();
  @Output() loanProductDelete = new EventEmitter<string>();
  @Output() loanProductStatusChange =
    new EventEmitter<LoanProductModels.LoanProduct>();

  ngOnChanges(changes: SimpleChanges): void {
    // When loan products change, generate action menus
    if (this.loanProducts && changes['loanProducts']) {
      this.actions = this.actionsGenerate(this.loanProducts, this.isLocked);
      this.monthlyPaymentRange.set(
        this.generateMonthlyRange(this.loanProducts)
      );
    }
    // When the lock status changes
    if (changes['isLocked']) {
      this.actions = this.actionsGenerate(this.loanProducts, this.isLocked);
    }
  }

  generateMonthlyRange(loanProducts?: LoanProductModels.LoanProduct[] | null) {
    if (!loanProducts) {
      return [];
    }
    return loanProducts.map((lp) => {
      return (lp.subProducts ?? []).reduce((a, b) => a + (b.fee ?? 0), 0);
    });
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
   * @param isLocked
   * @returns
   */
  private actionsGenerate(
    loanProducts?: LoanProductModels.LoanProduct[] | null,
    isLocked?: null | boolean
  ): MenuItem[][] {
    if (!loanProducts?.length) {
      return [];
    }
    return loanProducts.map((lp) => {
      return [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => this.loanProductEdit.emit(lp),
          disabled: isLocked ?? false,
        },
        {
          label: 'Escalate',
          icon: 'pi pi-exclamation-triangle',
        },
        {
          label: 'Approve',
          icon: 'pi pi-thumbs-up',
          command: () => {
            if (!lp.id) {
              return;
            }
            if (lp.status?.approved) {
              this.lpSvc.loanProductStatusChange(lp.id, {
                approved: false,
                rejected: false,
              });
            } else {
              this.lpSvc.loanProductStatusChange(lp.id, {
                approved: true,
                rejected: false,
              });
            }
          },
        },
        {
          label: 'Reject',
          icon: 'pi pi-thumbs-down',
          command: () => {
            if (!lp.id) {
              return;
            }
            if (lp.status?.rejected) {
              this.lpSvc.loanProductStatusChange(lp.id, {
                approved: false,
                rejected: false,
              });
            } else {
              this.lpSvc.loanProductStatusChange(lp.id, {
                approved: false,
                rejected: true,
              });
            }
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
          disabled: isLocked ?? false,
          command: () => {
            if (!lp.id) {
              return;
            }
            this.lpSvc.loanProductDelete(lp.id);
          },
        },
      ];
    });
  }

  constructor(private lpSvc: LoanProductsService) {}

  public collapseAll() {
    this.expandedRows = {};
  }

  public onRowExpand(event: TableRowExpandEvent) {
    // console.log('onRowExpand', event);
  }

  public onRowCollapse(event: TableRowCollapseEvent) {
    // console.log('onRowCollapse', event);
  }
}
