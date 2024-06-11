import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsService } from '../../shared/services/loan-products.service';
@Component({
  selector: 'app-sub-products-grid',
  templateUrl: './sub-products-grid.component.html',
  styleUrl: './sub-products-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubProductsGridComponent implements OnChanges {
  @Input() creditProducts?: LoanProductModels.CreditProduct[] | null = [];
  @Input() nonCreditProducts?: LoanProductModels.NonCreditProduct[] | null = [];
  @Input() colLength = 7;

  public products: (
    | LoanProductModels.CreditProduct
    | LoanProductModels.NonCreditProduct
  )[] = [];

  public subProductType = LoanProductModels.SubProductType;

  @Output() modalOpen = new EventEmitter<{
    parentId: string;
    type: LoanProductModels.SubProductType;
    product?: LoanProductModels.SubProduct | null;
  }>();

  // public actions: MenuItem[][] = this.actionsGenerate(this.nonCreditProducts);

  constructor(public lpSvc: LoanProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Merge all subproduct types into a single table
    if (changes['creditProducts'] || changes['nonCreditProducts']) {
      this.products = [
        ...(this.creditProducts ?? []),
        ...(this.nonCreditProducts ?? []),
      ].sort((a, b) => a.type - b.type);
      // When loan products change, generate action menus
      // this.actions = this.actionsGenerate(this.nonCreditProducts);
    }
  }

  /**
   * Edit
   * @param i
   */
  public edit(p: LoanProductModels.NonCreditProduct) {
    this.modalOpen.emit({
      type: this.subProductType.Noncredit,
      parentId: p.parentId,
      product: p,
    });
  }

  /**
   * Generate action menus for each loan product
   * @param loanProducts
   * @returns

  private actionsGenerate(
    loanProducts?: LoanProductModels.NonCreditProduct[] | null
  ): MenuItem[][] {
    if (!loanProducts?.length) {
      return [];
    }
    return loanProducts.map((lp) => {
      return [

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
            console.log(lp);
          },
        },
        {
          label: 'Reject',
          icon: 'pi pi-refresh',
          command: () => {
            console.log(lp);
          },
        },
        {
          label: 'Set Customer Selection',
          icon: 'pi pi-refresh',
          command: () => {
            console.log(lp);
          },
        },

        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (x) => {
            this.lpSvc.nonCreditProductDelete(lp);
            console.log(x, lp);
          },
        },
      ];
    });
  }
  */
}
