import { FormsLib } from '$forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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

  @Input() formDefaults?: LoanProductModels.LoanProduct | null = null;

  public loanProductsForm = this.fb.group({
    cashOut: [2100, Validators.required],
    payoffs: [0, Validators.required],
    baseCashAdvance: [2600, Validators.required],
    term: [12, Validators.required],
    fees: [0, Validators.required],
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

  constructor(private fb: FormBuilder) {
    this.populateAssets();
    this.populateCreditors();
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
      this.loanProductsForm.patchValue(this.formDefaults);
    }
  }

  populateAssets() {
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
    console.log(this.loanProductsForm.value);
  }
}
