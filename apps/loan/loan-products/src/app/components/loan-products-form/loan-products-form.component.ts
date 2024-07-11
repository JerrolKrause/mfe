import { FormsLib } from '$forms';
import { AppStorageService, AssetsModels, assetsStubData } from '$shared';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { LoanProductsState } from '../../shared/services/loan-products.service';
import { loanProductsFormModel } from './utils/loan-products-form-model.util';

@Component({
  selector: 'app-loan-products-form',
  templateUrl: './loan-products-form.component.html',
  styleUrl: './loan-products-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsFormComponent {
  public state = input<LoanProductsState | null | undefined>(null);
  // public assets = input<AssetsModels.Asset[] | null | undefined>(null);
  public creditors = input<LoanProductModels.Creditor[] | null | undefined>(
    null
  );
  public maxValues = input<LoanProductModels.LoanProduct>({
    cashOut: 22000,
    payoffs: 10000,
    baseCashAdvance: 20000,
  });

  public assets = signal<AssetsModels.Asset[] | null | undefined>(
    this.storage.assets ?? assetsStubData // Use data from mock localstorage, fall back to stub data
  );

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
    assets: this.fb.array<AssetsModels.Asset[]>([]),
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

  public loanID$ = this.route.paramMap.pipe(
    map((params) => params.get('loanId') ?? null)
  );

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: AppStorageService
  ) {
    this.reset();
    // When inputs change, regenerate assets/creditors/form defaults in the form
    effect(() => this.populateAssets(this.assets()));
    effect(() => this.populateCreditors(this.creditors()));
    effect(() =>
      this.loanProductsForm.patchValue(this.formDefaults() ?? ({} as any))
    ); // @todo
  }

  public reset() {
    this.loanProductsForm.reset();
    this.populateAssets(this.assets());
    this.populateCreditors(this.creditors());
  }

  populateAssets(assets: AssetsModels.Asset[] | null | undefined): void {
    // Clear the form array before populating
    this.assetsFormArray.clear();
    assets?.forEach((asset) => {
      let isSelected = false;
      if (
        asset.selected ||
        this.formDefaults()?.vehicles?.includes('MULTI VEHICLE') ||
        this.formDefaults()?.vehicles?.includes(asset.valuation.make)
      ) {
        isSelected = true;
      }
      this.assetsFormArray.push(
        this.fb.group({
          id: [asset.id],
          label: [asset.valuation.make],
          valuation: this.fb.group({
            value: [asset.valuation.value],
            balance: [asset.valuation.balance],
            year: [asset.valuation.year],
            model: [asset.valuation.model],
            vin: [asset.valuation.vin],
            mileage: [asset.valuation.mileage],
            mileageUpdated: [asset.valuation.mileageUpdated],
            by: [asset.valuation.by],
            ownedFreeAndClear: [asset.valuation.ownedFreeAndClear],
            firstLienHolder: [asset.valuation.firstLienHolder],
            secondLienHolder: [asset.valuation.secondLienHolder],
            autoCheckComplete: [asset.valuation.autoCheckComplete],
            vehicleInspection: [asset.valuation.vehicleInspection],
            exceptionApproved: [asset.valuation.exceptionApproved],
            qualifiedForDirectAuto: [asset.valuation.qualifiedForDirectAuto],
          }),
          equity: [asset.equity],
          monthlyPayment: [asset.monthlyPayment],
          selected: [isSelected],
        })
      );
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
