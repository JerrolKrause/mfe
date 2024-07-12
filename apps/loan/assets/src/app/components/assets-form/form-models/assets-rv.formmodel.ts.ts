import { FormsLib } from '$forms';

export const rvAssetForm: FormsLib.FormGenerator = [
  {
    type: 'container',
    visible: {
      field: 'assetType',
      operator: 'eq',
      value: 'rv',
    },
    content: [
      {
        type: 'html',
        html: '<h2>RV Information</h2>',
      },
    ],
  },
];
