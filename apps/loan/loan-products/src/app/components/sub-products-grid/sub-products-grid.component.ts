import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsService } from '../../shared/services/loan-products.service';
@Component({
  selector: 'app-sub-products-grid',
  templateUrl: './sub-products-grid.component.html',
  styleUrl: './sub-products-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubProductsGridComponent {
  public creditProducts = input<LoanProductModels.CreditProduct[] | null>(null);
  public nonCreditProducts = input<LoanProductModels.NonCreditProduct[] | null>(
    null
  );
  public colLength = input(7);

  public products = computed(() =>
    [
      ...(this.creditProducts() ?? []),
      ...(this.nonCreditProducts() ?? []),
    ].sort((a, b) => a.type - b.type)
  );

  public subProductType = LoanProductModels.SubProductType;

  @Output() modalOpen = new EventEmitter<{
    parentId: string;
    type: LoanProductModels.SubProductType;
    product?: LoanProductModels.SubProduct | null;
  }>();

  constructor(public lpSvc: LoanProductsService) {}

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
}
