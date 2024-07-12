import { FormsLib } from '$forms';

export const vehicleAssetForm: FormsLib.FormGenerator = [
  {
    type: 'container',
    visible: {
      field: 'assetType',
      operator: 'eq',
      value: 'vehicle',
    },
    content: [
      {
        type: 'html',
        html: '<h2>Vehicle Information</h2>',
      },

      {
        type: 'container',
        cssClasses: 'bg-highlight',
        content: [
          {
            type: 'row',
            columns: [
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Year',
                    type: 'formField',
                    formFieldType: 'text',
                    field: 'valuation.year',
                    placeholder: '2021',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Make',
                    type: 'formField',
                    formFieldType: 'text',
                    field: 'valuation.make',
                    placeholder: 'Honda',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Model',
                    type: 'formField',
                    formFieldType: 'text',
                    field: 'valuation.model',
                    placeholder: 'CRV',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'VIN',
                    type: 'formField',
                    formFieldType: 'text',
                    field: 'valuation.vin',
                    placeholder: '1HGBH41JXMN109186',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Mileage',
                    type: 'formField',
                    formFieldType: 'number',
                    field: 'valuation.mileage',
                    placeholder: '21,000',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Mileage Updated',
                    type: 'formField',
                    formFieldType: 'number',
                    field: 'valuation.mileageUpdated',
                    placeholder: '33,000',
                  },
                ],
              },
            ],
          },

          {
            type: 'row',
            columns: [
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Value',
                    type: 'formField',
                    formFieldType: 'number',
                    mode: 'currency',
                    field: 'valuation.value',
                    placeholder: '$31,500',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Balance',
                    type: 'formField',
                    formFieldType: 'number',
                    mode: 'currency',
                    field: 'valuation.balance',
                    placeholder: '$13,250',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Owned Free & Clear?',
                    type: 'formField',
                    formFieldType: 'checkbox',
                    field: 'valuation.ownedFreeAndClear',
                  },
                  {
                    label: 'Auto check complete?',
                    type: 'formField',
                    formFieldType: 'checkbox',
                    field: 'valuation.autoCheckComplete',
                  },
                  {
                    label: 'Vehicle Inspection?',
                    type: 'formField',
                    formFieldType: 'checkbox',
                    field: 'valuation.vehicleInspection',
                  },
                ],
              },
              {
                type: 'column',
                width: 2,
                content: [
                  {
                    label: 'Exception Approved?',
                    type: 'formField',
                    formFieldType: 'checkbox',
                    field: 'valuation.exceptionApproved',
                  },
                  {
                    label: 'Qualified for Direct Auto?',
                    type: 'formField',
                    formFieldType: 'checkbox',
                    field: 'valuation.qualifiedForDirectAuto',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
