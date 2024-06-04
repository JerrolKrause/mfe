import { FormsLib } from '$forms';
import { LoanProductModels } from '../../../shared/models/loan-products.models';

export const loanProductsFormModel = (
  maxValues?: LoanProductModels.LoanProduct | null
): FormsLib.FormGenerator => [
  {
    label: 'Cash to Customer',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'cashOut',
    max: maxValues?.cashOut ?? null,
    hint: maxValues?.cashOut ? `Max cash out is $${maxValues?.cashOut}` : null,
    validators: {
      required: true,
    },
  },
  {
    label: 'Payoffs',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'payoffs',
    max: maxValues?.payoffs ?? null,
    hint: maxValues?.payoffs ? `Max payoffs is $${maxValues?.payoffs}` : null,
    validators: {
      required: true,
    },
  },
  {
    label: 'Base Cash Advance',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'baseCashAdvance',
    max: maxValues?.baseCashAdvance ?? null,
    hint: maxValues?.baseCashAdvance
      ? `Max cash advance is $${maxValues?.baseCashAdvance}`
      : null,
    validators: {
      required: true,
    },
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
    validators: {
      required: true,
    },
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

export const loanProductsModel: FormsLib.FormGenerator = [
  {
    label: 'Cash to Customer',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'cashOut',
    max: 2000,
    hint: `Max cash out is $2,000`,
    validators: {
      required: true,
    },
  },
  {
    label: 'Payoffs',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'payoffs',
    validators: {
      required: true,
    },
  },
  {
    label: 'Base Cash Advance',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'baseCashAdvance',
    validators: {
      required: true,
    },
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
    validators: {
      required: true,
    },
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
