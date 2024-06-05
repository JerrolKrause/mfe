import { LoanCalculator } from '$quote-calculator';
import { AppStorageService } from '$shared';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { map, mergeMap, of, take } from 'rxjs';
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
    parentId,
    type,
    product,
  }: {
    parentId: string;
    type: LoanProductModels.SubProductType;
    product?: LoanProductModels.SubProduct | null;
  }) {
    // Select which modal component to use
    const modal =
      type === LoanProductModels.SubProductType.Credit
        ? CreditProductsBuilderComponent
        : NonCreditProductsBuilderComponent;
    // Which product type
    const headerType =
      type === LoanProductModels.SubProductType.Credit
        ? 'Credit'
        : 'Non-Credit';

    // Launch modal
    this.dialogService
      .open(modal, {
        header: product?.id
          ? `Edit ${headerType} Product`
          : `Add ${headerType} Product`,
        data: { parentId, type, ...product }, // Attach parent ID and sub product type
        modal: true,
        closable: true,
        dismissableMask: true,
      })
      .onClose.pipe(take(1))
      .subscribe((p: LoanProductModels.SubProduct) =>
        this.lpSvc.subProductUpsert(p)
      );
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
