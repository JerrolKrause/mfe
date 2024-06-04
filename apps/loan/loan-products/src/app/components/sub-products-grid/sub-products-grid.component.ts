import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoanProductModels } from '../../shared/models/loan-products.models';
@Component({
  selector: 'app-sub-products-grid',
  templateUrl: './sub-products-grid.component.html',
  styleUrl: './sub-products-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubProductsGridComponent implements OnChanges {
  @Input() products?: LoanProductModels.SubProducts[] | null = [];
  @Input() colLength = 7;

  public actions: MenuItem[][] = this.actionsGenerate(this.products);

  ngOnChanges(changes: SimpleChanges): void {
    // When loan products change, generate action menus
    if (this.products && changes['products']) {
      this.actions = this.actionsGenerate(this.products);
    }
  }

  /**
   * Edit
   * @param i
   */
  public edit(i: number) {
    console.log(i);
  }

  /**
   * Delete
   * @param i
   */
  public delete(i: number) {
    console.log(i);
  }

  /**
   * Generate action menus for each loan product
   * @param loanProducts
   * @returns
   */
  private actionsGenerate(
    loanProducts?: LoanProductModels.SubProducts[] | null
  ): MenuItem[][] {
    if (!loanProducts?.length) {
      return [];
    }
    return loanProducts.map((lp) => {
      return [
        /**
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
         */
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (x) => {
            console.log(x, lp);
          },
        },
      ];
    });
  }
}
