import { FormsLib } from '$forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { LoanProductModels } from '../../shared/models/loan-products.models';
import { loanProductsModel } from './utils/loan-products-form-model.util';

@Component({
  selector: 'app-loan-products-builder',
  templateUrl: './loan-products-builder.component.html',
  styleUrl: './loan-products-builder.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsBuilderComponent implements OnChanges {
  @Input() assets?: LoanProductModels.Asset[] | null = [];

  @Input() creditors?: LoanProductModels.Creditor[] | null = [];

  @Input() formDefaults?: any | null = {
    cashOut: 1000,
    loanAmount: 0,
    monthlyPayment: 0,
    paymentImpact: 0,
    term: 24,
    apr: 0,
    payoffs: 10,
    baseCashAdvance: 2000,
    fees: 100,
  };

  public loanProductsForm = this.fb.group({
    cashOut: [0],
    loanAmount: [0],
    monthlyPayment: [0],
    paymentImpact: [0],
    term: [0],
    apr: [0],
    payoffs: [0],
    baseCashAdvance: [0],
    fees: [0],
    assets: this.fb.array([]),
    creditors: this.fb.array([]),
  });

  public formOptions: FormsLib.FormOptions = {
    submitButton: {
      // label: 'Add Loan Product',
      hide: true,
    },
  };

  public loanProductsModel: FormsLib.FormGenerator = loanProductsModel;

  @Output() formSubmit = new EventEmitter<LoanProductModels.LoanProductForm>();

  constructor(private fb: FormBuilder) {
    this.populateAssets();
    this.populateCreditors();
    this.loanProductsForm.patchValue(this.formDefaults as any);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When assets change, regenerate assets in the form
    if (changes['assets']) {
      this.populateAssets();
    }
    // When creditors change, regenerate assets in the form
    if (changes['creditors']) {
      this.populateCreditors();
    }
    // Change default values in the forms
    if (changes['formDefaults'] && this.formDefaults) {
      this.loanProductsForm.patchValue(this.formDefaults as any);
    }
  }

  populateAssets() {
    // Clear the form array before populating
    this.assetsFormArray.clear();

    if (!this.assets?.length) {
      return;
    }
    this.assets.forEach((asset) => {
      this.assetsFormArray.push(
        this.fb.group({
          id: [asset.id],
          label: [asset.label],
          totalOwed: [asset.totalOwed],
          assetValue: [asset.assetValue],
          monthlyPayment: [asset.monthlyPayment],
          apr: [asset.apr],
          selected: [asset.selected],
        })
      );
      asset;
    });
  }

  populateCreditors() {
    // Clear the form array before populating
    this.creditorsFormArray.clear();

    if (!this.creditors?.length) {
      return;
    }
    this.creditors.forEach((creditor) => {
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
    this.loanProductsForm.patchValue(this.loanProductsForm.value);
    this.loanProductsForm.markAllAsTouched();
    if (this.loanProductsForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.loanProductsForm.value as any);
    this.loanProductsForm.reset();
    if (this.formDefaults) {
      this.loanProductsForm.patchValue(this.formDefaults as any);
    }

    this.populateAssets();
    this.populateCreditors();
  }
}
