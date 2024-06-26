import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsService } from '../../shared/services/loan-products.service';
import { LoanDetailsComponent } from '../loan-details/loan-details.component';

@Component({
  selector: 'app-loan-products-grid',
  templateUrl: './loan-products-grid.component.html',
  styleUrl: './loan-products-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsGridComponent {
  public loanProducts = input<
    LoanProductModels.LoanProduct[] | null | undefined
  >(null);
  public isLocked = input<boolean | null | undefined>(null);

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
  public actions = computed(() =>
    (this.loanProducts() ?? []).map((lp) => {
      return [
        {
          label: 'Loan Details',
          icon: 'pi pi-search',
          command: () =>
            this.lpSvc.modalOpen({
              component: LoanDetailsComponent,
              header: 'Loan Details',
              data: lp,
            }),
          disabled: this.isLocked() ?? false,
        },
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => this.loanProductEdit.emit(lp),
          disabled: this.isLocked() ?? false,
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
          disabled: this.isLocked() ?? false,
          command: () => {
            if (!lp.id) {
              return;
            }
            this.lpSvc.loanProductDelete(lp.id);
          },
        },
      ];
    })
  );

  /** Generate the monthly payment range for each loan product using it's subproducts */
  public monthlyPaymentRange = computed(() =>
    (this.loanProducts() ?? []).map((lp) =>
      [...(lp.creditProducts ?? []), ...(lp.nonCreditProducts ?? [])]
        // Only get selected products
        .filter((p) => p.selected)
        // Turn all the results into a single number
        .reduce((a, b) => a + (b.fee ?? 0), 0)
    )
  );

  /** Keep track of all expanded rows */
  public expandedRows = signal<Record<string, boolean>>({});
  public quoteSelected = signal<null | number>(null);

  @Output() modalOpen = new EventEmitter<{
    parentId: string;
    type: LoanProductModels.SubProductType;
    product?: LoanProductModels.SubProduct | null;
  }>();
  @Output() loanProductEdit = new EventEmitter<LoanProductModels.LoanProduct>();
  @Output() loanProductDelete = new EventEmitter<string>();
  @Output() loanProductStatusChange =
    new EventEmitter<LoanProductModels.LoanProduct>();

  /**
   * Expand all rows
   * @returns
   */
  public expandAll() {
    this.expandedRows.set(
      (this.loanProducts() ?? []).reduce(
        (acc, p) => (acc[p.id ?? ''] = true) && acc,
        {} as Record<string, boolean>
      )
    );
  }

  constructor(
    private lpSvc: LoanProductsService,
    public dialogService: DialogService
  ) {}

  public quoteSelect(rowIndex: number) {
    this.quoteSelected.set(rowIndex === this.quoteSelected() ? null : rowIndex);
    this.lpSvc.quoteSetActive(this.loanProducts()?.[rowIndex] ?? null);
  }

  public openModal(modal: { component: any; header: string; data: unknown }) {
    this.dialogService.open(modal.component, {
      header: modal.header,
      modal: true,
      closable: true,
      data: modal.data,
      dismissableMask: true,
    });
  }

  public collapseAll() {
    this.expandedRows.set({});
  }

  public onRowExpand(event: TableRowExpandEvent) {
    // console.log('onRowExpand', event);
  }

  public onRowCollapse(event: TableRowCollapseEvent) {
    // console.log('onRowCollapse', event);
  }
}
