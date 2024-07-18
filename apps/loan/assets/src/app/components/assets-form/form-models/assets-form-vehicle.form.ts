import { FormsLib } from '$forms';

export const vehicleAssetForm: FormsLib.FormGenerator = [
  {
    type: 'container',

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
                width: 6,
                content: [
                  {
                    label: 'Who',
                    type: 'formField',
                    formFieldType: 'dropdown',
                    field: 'who',
                    options: [
                      {
                        label: 'Primary',
                        value: 0,
                      },
                      {
                        label: 'Coborrower',
                        value: 1,
                      },
                      {
                        label: 'Joint',
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                type: 'column',
                width: 6,
                content: [
                  {
                    label: 'Category',
                    type: 'formField',
                    formFieldType: 'dropdown',
                    field: 'category',
                    placeholder: '1AGBH41YXMN102222',
                    options: [
                      {
                        label: 'Auto or Truck',
                        value: 0,
                      },
                      {
                        label: 'Boat',
                        value: 1,
                      },
                      {
                        label: 'Trailer',
                        value: 2,
                      },
                    ],
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
                width: 8,
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
                width: 4,
                content: [
                  {
                    type: 'button',
                    label: 'No Vin',
                    cssClasses: 'p-button w-100 text-center d-block',
                    cmd: (r) => {
                      const c = r.formGroup.get('$$computed.noVinToggle');
                      if (c) c.patchValue(!c.value);
                    },
                    offsetTop: true,
                  },
                ],
              },
            ],
          },
          {
            type: 'row',
            visible: {
              field: '$$computed.noVinToggle',
              operator: 'eq',
              value: true,
            },
            columns: [
              {
                type: 'column',
                width: 3,
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
                width: 3,
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
                width: 3,
                content: [
                  {
                    label: 'Year',
                    type: 'formField',
                    formFieldType: 'text',
                    field: 'valuation.year',
                    placeholder: '2018',
                  },
                ],
              },
              {
                type: 'column',
                width: 3,
                content: [
                  {
                    type: 'button',
                    label: 'Lookup',
                    cssClasses: 'p-button w-100 text-center d-block',
                    cmd: (r) => {
                      console.log('Launching modal at some point');
                    },
                    offsetTop: true,
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
                width: 6,
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
                width: 6,
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
                width: 3,
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
                width: 3,
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
                width: 3,
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
                width: 3,
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
