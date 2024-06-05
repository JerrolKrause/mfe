import { FormsLib } from '$forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoanProductModels } from '../../shared/models/loan-products.models';

@Component({
  selector: 'app-non-credit-products-builder',
  templateUrl: './non-credit-products-builder.component.html',
  styleUrl: './non-credit-products-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCreditProductsBuilderComponent implements OnInit {
  public nonCreditProductForm = this.fb.group<
    LoanProductModels.Nullable<LoanProductModels.SubProduct>
  >({
    id: null,
    parentId: null,
    label: null,
    insured: null,
    type: null,
    benefitAmount: null,
    fee: null,
    dateEffective: null,
    term: null,
  });
  public formOptions: FormsLib.FormOptions = {};

  public formModel: FormsLib.FormGenerator = [
    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 6,
          content: [
            {
              label: 'Insured Name',
              type: 'formField',
              formFieldType: 'radio',
              field: 'insured',
              options: [{ label: 'Colleen Denning', value: 'Colleen Denning' }],
              validators: {
                required: true,
              },
            },
            {
              label: 'Product Type',
              type: 'formField',
              formFieldType: 'radio',
              field: 'label',
              options: [
                { label: 'Auto Plan', value: 'Auto Plan' },
                { label: 'Home & Auto Plan', value: 'Home & Auto Plan' },
                {
                  label: 'Silver Safeguard Plan',
                  value: 'Silver Safeguard Plan',
                },
              ],
              validators: {
                required: true,
              },
            },
          ],
        },
        {
          type: 'column',
          width: 6,
          content: [
            {
              label: 'Benefit Amount',
              type: 'formField',
              formFieldType: 'number',
              field: 'benefitAmount',
              placeholder: '$1,000',
              mode: 'currency',
              validators: {
                required: true,
              },
            },
            {
              label: 'Premium or Fee',
              type: 'formField',
              formFieldType: 'number',
              mode: 'currency',
              field: 'fee',
              placeholder: '$100',
              validators: {
                required: true,
              },
            },
            {
              label: 'Effective Date',
              type: 'formField',
              formFieldType: 'date',
              field: 'dateEffective',
              validators: {
                required: true,
              },
            },
            {
              label: 'Term',
              type: 'formField',
              formFieldType: 'number',
              field: 'term',
              placeholder: '24',
              validators: {
                required: true,
              },
            },
          ],
        },
      ],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.nonCreditProductForm.patchValue(this.config.data);
    }
  }

  public submit() {
    this.ref.close(this.nonCreditProductForm.getRawValue());
  }
}
