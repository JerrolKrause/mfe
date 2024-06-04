import { LoanCalculator } from '$quote-calculator';
import { AppStorageService } from '$shared';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, mergeMap, of } from 'rxjs';
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

  public loanProducts$ = this.route.params.pipe(
    map((params) => params['loanId']),
    mergeMap((loanId) =>
      loanId === '533854' ? this.lpSvc.loanProducts$ : of([])
    )
  );

  public assets$ = this.route.params.pipe(
    map((params) => params['loanId']),
    mergeMap((loanId) => (loanId === '533854' ? this.lpSvc.assets$ : of([])))
  );

  public creditors$ = this.route.params.pipe(
    map((params) => params['loanId']),
    mergeMap((loanId) => (loanId === '533854' ? this.lpSvc.creditors$ : of([])))
  );

  public loanProductToEdit = signal<null | LoanProductModels.LoanProduct>(null);

  public isOnline = signal(false);

  constructor(
    public lpSvc: LoanProductsService,
    public dialogService: DialogService,
    public storage: AppStorageService,
    private route: ActivatedRoute
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

  public loanProductEdit(lp: LoanProductModels.LoanProduct) {
    this.loanProductToEdit.update(() => lp);
  }

  /**
   * When the tab index changes
   * @param i
   */
  public activeIndexChange(i: number) {
    // If the second tab is highlighted, remove the hasCustomerUpdate flag
    if (i === 1) {
      this.lpSvc.stateChange({ hasCustomerUpdate: false });
    }
  }

  public quoteFormChanged(form: LoanCalculator.Quote) {
    console.log(form);
  }
}
