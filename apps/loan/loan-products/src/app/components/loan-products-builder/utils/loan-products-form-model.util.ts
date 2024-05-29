import { FormsLib } from '$forms';

export const loanProductsModel: FormsLib.FormGenerator = [
  {
    label: 'Cash to Customer',
    type: 'formField',
    formFieldType: 'number',
    mode: 'currency',
    field: 'cashOut',
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
