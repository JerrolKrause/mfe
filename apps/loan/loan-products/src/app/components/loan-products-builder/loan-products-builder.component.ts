import { FormsLib } from '$forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  effect,
  input,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsState } from '../../shared/services/loan-products.service';
import { loanProductsFormModel } from './utils/loan-products-form-model.util';

@Component({
  selector: 'app-loan-products-builder',
  templateUrl: './loan-products-builder.component.html',
  styleUrl: './loan-products-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsBuilderComponent {
  public state = input<LoanProductsState | null | undefined>(null);
  public assets = input<LoanProductModels.Asset[] | null | undefined>(null);
  public creditors = input<LoanProductModels.Creditor[] | null | undefined>(
    null
  );
  public maxValues = input<LoanProductModels.LoanProduct>({
    cashOut: 22000,
    payoffs: 10000,
    baseCashAdvance: 20000,
  });

  public formDefaults = input<Partial<LoanProductModels.LoanProduct> | null>({
    id: '',
    cashOut: 1000,
    loanAmount: 0,
    monthlyPayment: 0,
    paymentImpact: 0,
    term: 24,
    apr: 0,
    payoffs: 10,
    baseCashAdvance: 2000,
    fees: 100,
  });

  public isLocked = input(false);
  public loanProductsModel = computed(() =>
    loanProductsFormModel(this.maxValues())
  );

  public loanProductsForm = this.fb.group({
    id: '',
    cashOut: 0,
    loanAmount: 0,
    monthlyPayment: 0,
    paymentImpact: 0,
    term: 0,
    apr: 0,
    payoffs: 0,
    baseCashAdvance: 0,
    fees: 0,
    sideLoan: false,
    assets: this.fb.array<LoanProductModels.Asset[]>([]),
    creditors: this.fb.array<LoanProductModels.Creditor[]>([]),
  });

  /** Calculate the payoffs by summing all the selected creditors */
  public payoffsTotal$ = this.loanProductsForm.controls[
    'creditors'
  ].valueChanges.pipe(
    startWith(this.loanProductsForm.controls['creditors'].value),
    debounceTime(250),
    map((creditors) =>
      creditors
        .filter((c) => c?.selected)
        .reduce((prev, acc) => prev + (acc?.totalOwed ?? 0), 0)
    )
  );

  public baseCashAdvance$ = combineLatest([
    this.payoffsTotal$,
    this.loanProductsForm.controls['cashOut'].valueChanges.pipe(
      startWith(this.loanProductsForm.controls['cashOut'].value)
    ),
  ]).pipe(map(([payoffs, cash]) => payoffs + (cash ?? 0)));

  public isEditing$ = this.loanProductsForm.valueChanges.pipe(
    startWith(this.loanProductsForm.value),
    map((lp) => !!lp.id)
  );

  public formOptions: FormsLib.FormOptions = {
    submitButton: {
      hide: true,
    },
  };

  public ndi$ = this.loanProductsForm.valueChanges.pipe(
    startWith(this.loanProductsForm.value),
    map((form) => 4000 - (form.cashOut ?? 0))
  );

  @Output() formSubmit = new EventEmitter<LoanProductModels.LoanProductForm>();

  constructor(private fb: FormBuilder) {
    this.reset();
    // When inputs change, regenerate assets/creditors/form defaults in the form
    effect(() => this.populateAssets(this.assets()));
    effect(() => this.populateCreditors(this.creditors()));
    effect(() => this.loanProductsForm.patchValue(this.formDefaults() ?? {}));
  }

  public reset() {
    this.loanProductsForm.reset();
    this.populateAssets(this.assets());
    this.populateCreditors(this.creditors());
  }

  populateAssets(assets: LoanProductModels.Asset[] | null | undefined) {
    // Clear the form array before populating
    this.assetsFormArray.clear();
    assets?.forEach((asset) => {
      let isSelected = false;
      if (
        asset.selected ||
        this.formDefaults()?.vehicles?.includes('MULTI VEHICLE') ||
        this.formDefaults()?.vehicles?.includes(asset.label)
      ) {
        isSelected = true;
      }
      this.assetsFormArray.push(
        this.fb.group({
          id: [asset.id],
          label: [asset.label],
          totalOwed: [asset.totalOwed],
          assetValue: [asset.assetValue],
          monthlyPayment: [asset.monthlyPayment],
          apr: [asset.apr],
          selected: [isSelected],
        })
      );
      asset;
    });
  }

  populateCreditors(
    creditors: LoanProductModels.Creditor[] | null | undefined
  ) {
    // Clear the form array before populating
    this.creditorsFormArray.clear();

    creditors?.forEach((creditor) => {
      this.creditorsFormArray.push(
        this.fb.group({
          id: [creditor.id],
          label: [creditor.label],
          totalOwed: [creditor.totalOwed],
          monthlyPayment: [creditor.monthlyPayment],
          apr: [creditor.apr],
          selected: [creditor.selected],
        })
      );
    });
  }

  get assetsFormArray(): FormArray {
    return this.loanProductsForm.get('assets') as FormArray;
  }

  get creditorsFormArray(): FormArray {
    return this.loanProductsForm.get('creditors') as FormArray;
  }

  onSelectAsset(index: number) {
    const asset = this.assetsFormArray.at(index);
    asset.patchValue({ selected: !asset.value.selected });
  }

  onSelectCreditor(index: number) {
    const creditor = this.creditorsFormArray.at(index);
    creditor.patchValue({ selected: !creditor.value.selected });
  }

  onSubmit() {
    // On submit, toggle validation states
    this.loanProductsForm.patchValue(this.loanProductsForm.value);
    this.loanProductsForm.markAllAsTouched();
    if (this.loanProductsForm.invalid) {
      return;
    }

    this.formSubmit.emit(this.loanProductsForm.value as any); // @todo - Remove Any
    this.reset();
  }
}
