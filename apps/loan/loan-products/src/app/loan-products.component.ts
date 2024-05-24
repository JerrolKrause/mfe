import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreditProductsBuilderComponent } from './components/credit-products-builder/credit-products-builder.component';
import { NonCreditProductsBuilderComponent } from './components/non-credit-products-builder/non-credit-products-builder.component';
import { LoanProductModels } from './shared/models/loan-products.models';
import { LoanProductsService } from './shared/services/loan-products.service';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.component.html',
  styleUrl: './loan-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsComponent {
  ref: DynamicDialogRef | undefined;
  constructor(
    public lpSvc: LoanProductsService,
    public dialogService: DialogService
  ) {}

  /**
   * Open a subproduct modal
   * @param type
   * @param productId
   */
  public modalOpen({
    type,
    productId,
  }: {
    type: LoanProductModels.SubProductType;
    productId: string;
  }) {
    const modal =
      type === LoanProductModels.SubProductType.Credit
        ? CreditProductsBuilderComponent
        : NonCreditProductsBuilderComponent;

    this.ref = this.dialogService.open(modal, {
      header:
        type === LoanProductModels.SubProductType.Credit
          ? 'Add/Edit A Credit Product'
          : 'Add/Edit A Non-Credit Product',
      data: productId,
      modal: true,
      closable: true,
      dismissableMask: true,
    });
  }
}
