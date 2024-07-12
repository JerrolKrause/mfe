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
        type: 'row',
        columns: [
          {
            type: 'column',
            width: 6,
            content: [
              {
                label: 'Year',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.year',
              },
              {
                label: 'Make',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.make',
              },
              {
                label: 'Model',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.model',
              },
              {
                label: 'VIN',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.vin',
              },
              {
                label: 'Mileage',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.mileage',
              },
              {
                label: 'Mileage Updated',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.mileageUpdated',
              },
            ],
          },
          {
            type: 'column',
            width: 6,
            content: [
              {
                label: 'Value',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.value',
              },
              {
                label: 'By',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.by',
              },
              {
                label: 'Owned Free & Clear?',
                type: 'formField',
                formFieldType: 'checkbox',
                field: 'valuation.ownedFreeAndClear',
              },
              {
                label: '1st Lien Holder',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.firstLienHolder',
              },
              {
                label: 'Balance',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.balance',
              },
              {
                label: '2nd Lien Holder',
                type: 'formField',
                formFieldType: 'text',
                field: 'valuation.secondLienHolder',
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
];
