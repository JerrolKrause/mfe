import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { AssetsService } from '../../shared/assets.services';
import { vehicleAssetForm } from './form-models/assets-form-vehicle.form';

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
})
export class AssetsFormComponent {
  public assetTypes = [
    { label: 'Vehicle', value: 'vehicle' },
    { label: 'Boat', value: 'boat' },
    { label: 'RV', value: 'rv' },
  ];

  public formModel: FormsLib.FormGenerator = [
    {
      type: 'container',
      content: [
        ...vehicleAssetForm,
        // ...boatAssetForm,
        // ...rvAssetForm,
        {
          type: 'html',
          html: '<hr/><h2>All Asset Information</h2>',
        },
        {
          type: 'row',
          columns: [
            {
              type: 'column',
              width: 6,
              content: [
                {
                  label: 'Vehicles on Credit Bureau',
                  type: 'formField',
                  formFieldType: 'number',
                  field: 'vehiclesOnCreditBureau',
                },
                {
                  label: 'Collateral Vehicles',
                  type: 'formField',
                  formFieldType: 'number',
                  field: 'collateralVehicles',
                },

                {
                  label: 'Reason Not Collateral',
                  type: 'formField',
                  formFieldType: 'text',
                  field: 'reasonNotCollateral',
                },
              ],
            },
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
                    { label: 'Applicant', value: 'Applicant' },
                    { label: 'Co-Applicant', value: 'Co-Applicant' },
                  ],
                },
                {
                  label: 'Category',
                  type: 'formField',
                  formFieldType: 'dropdown',
                  field: 'category',
                  options: [{ label: 'Auto or Truck', value: 'Auto or Truck' }],
                },
                {
                  label: 'Salvage Title?',
                  type: 'formField',
                  formFieldType: 'checkbox',
                  field: 'salvageTitle',
                },
                {
                  label: 'Purchase Money?',
                  type: 'formField',
                  formFieldType: 'checkbox',
                  field: 'purchaseMoney',
                },
                {
                  label: 'Collateral?',
                  type: 'formField',
                  formFieldType: 'checkbox',
                  field: 'collateral',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  constructor(public assetsSvc: AssetsService) {}

  onSubmit(): void {
    if (!this.assetsSvc.assetsForm.valid) {
      return;
    }

    this.assetsSvc.saveAsset(this.assetsSvc.assetsForm.value as any);
  }
}
