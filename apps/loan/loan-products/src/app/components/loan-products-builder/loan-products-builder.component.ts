import { FormsLib } from '$forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      label: 'Create Loan Product',
      // hide: true,
    },
  };

  assets: LoanProductModels.Asset[] = [
    {
      id: '1',
      name: '2020 TOYOTA RAV4',
      amount: 36000,
      payment: 0,
      rate: 0,
      selected: false,
    },
    {
      id: '2',
      name: '2010 CHEVROLET SILVERADO',
      amount: 10905,
      payment: 0,
      rate: 0,
      selected: false,
    },
  ];
  creditors: LoanProductModels.Creditor[] = [
    {
      id: '1',
      name: 'DISCOVER FIN SVCS',
      amountOwed: 673,
      monthlyPayment: 33,
      rate: 29,
      selected: false,
    },
    {
      id: '2',
      name: 'BANK CREDIT CARD',
      amountOwed: 6430,
      monthlyPayment: 33,
      rate: 18,
      selected: false,
    },
    {
      id: '3',
      name: 'ULTRAMAR DIAMOND S',
      amountOwed: 1250,
      monthlyPayment: 45,
      rate: 21,
      selected: false,
    },
    {
      id: '4',
      name: 'EXXON/MBGA',
      amountOwed: 345,
      monthlyPayment: 30,
      rate: 14,
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
      this.assetsFormArray.push(this.createSubProductGroup(asset));
    });
  }

  populateCreditors() {
    this.creditors.forEach((creditor) => {
      this.creditorsFormArray.push(this.createSubProductGroup(creditor));
    });
  }

  createSubProductGroup(subProduct: any): FormGroup {
    return this.fb.group({
      id: [subProduct.id],
      name: [subProduct.name],
      amount: [subProduct.amount],
      payment: [subProduct.payment],
      rate: [subProduct.rate],
      selected: [subProduct.selected],
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
