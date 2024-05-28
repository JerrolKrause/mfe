import { FormsLib } from '$forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoanProductModels } from '../../shared/models/loan-products.models';

@Component({
  selector: 'app-loan-products-builder',
  templateUrl: './loan-products-builder.component.html',
  styleUrl: './loan-products-builder.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductsBuilderComponent {
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
      label: 'Add Loan Product',
      // hide: true,
    },
  };

  assets: LoanProductModels.Asset[] = [
    {
      id: '1',
      label: '2020 TOYOTA RAV4',
      assetValue: 36000,
      totalOwed: 0,
      monthlyPayment: 0,
      apr: 0,
      selected: false,
    },
    {
      id: '2',
      label: '2010 CHEVROLET SILVERADO',
      assetValue: 10905,
      totalOwed: 4000,
      monthlyPayment: 0,
      apr: 12,
      selected: false,
    },
  ];
  creditors: LoanProductModels.Creditor[] = [
    {
      id: '0',
      label: 'DISCOVER FIN SVCS',
      totalOwed: 673,
      monthlyPayment: 33,
      apr: 29,
      selected: false,
    },
    {
      id: '1',
      label: 'BANK CREDIT CARD',
      totalOwed: 6430,
      monthlyPayment: 33,
      apr: 18,
      selected: false,
    },
    {
      id: '2',
      label: 'ULTRAMAR DIAMOND S',
      totalOwed: 1250,
      monthlyPayment: 45,
      apr: 21,
      selected: false,
    },
    {
      id: '3',
      label: 'EXXON/MBGA',
      totalOwed: 345,
      monthlyPayment: 30,
      apr: 14,
      selected: false,
    },
  ];

  public loanProductsModel: FormsLib.FormGenerator = [
    {
      label: 'Cash to Customer',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'cashOut',
    },
    {
      label: 'Payoffs',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'payoffs',
    },
    {
      label: 'Base Cash Advance',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'baseCashAdvance',
    },
    {
      type: 'html',
      html: '<hr/>',
    },
    {
      label: 'Term',
      type: 'formField',
      formFieldType: 'number',
      field: 'term',
    },
    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 6,
          content: [
            {
              label: 'Fees',
              type: 'formField',
              formFieldType: 'number',
              mode: 'currency',
              field: 'fees',
            },
          ],
        },
        {
          type: 'column',
          width: 6,
          content: [
            {
              cssClasses: 'p-button w-100 text-center mt-4',
              type: 'button',
              label: 'Select',
              cmd: () => {},
            },
          ],
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {
    this.populateAssets();
    this.populateCreditors();
  }

  populateAssets() {
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
