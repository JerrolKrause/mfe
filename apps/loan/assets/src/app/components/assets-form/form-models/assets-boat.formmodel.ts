import { FormsLib } from '$forms';

export const boatAssetForm: FormsLib.FormGenerator = [
  {
    type: 'container',
    visible: {
      field: 'assetType',
      operator: 'eq',
      value: 'boat',
    },
    content: [
      {
        type: 'html',
        html: '<h2>Boat Information</h2>',
      },
    ],
  },
];
