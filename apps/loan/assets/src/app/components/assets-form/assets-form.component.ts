import { FormsLib } from '$forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AssetsService } from '@assets/app/shared/assets.services';

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
})
export class AssetsFormComponent implements OnInit {
  assetsForm = this.fb.group({
    anyVehicles: [null],
    vehiclesOnCreditBureau: [0],
    collateralVehicles: [0],
    who: ['Applicant'],
    category: [''],
    type: [''],
    collateral: [null],
    reasonNotCollateral: [''],
    valuation: this.fb.group({
      year: [''],
      make: [''],
      model: [''],
      vin: [''],
      mileage: [''],
      mileageUpdated: [''],
      value: [''],
      by: [''],
      ownedFreeAndClear: [null],
      firstLienHolder: [''],
      balance: [''],
      secondLienHolder: [''],
      autoCheckComplete: [null],
      vehicleInspection: [null],
      exceptionApproved: [null],
      qualifiedForDirectAuto: [null],
    }),
    salvageTitle: [null],
    purchaseMoney: [null],
  });

  public formModel: FormsLib.FormGenerator = [
    {
      type: 'container',
      content: [
        {
          type: 'row',
          columns: [
            {
              type: 'column',
              width: 6,
              content: [
                /**
                {
                  label: 'Any Vehicles?',
                  type: 'formField',
                  formFieldType: 'checkbox',
                  field: 'anyVehicles',
                },
                 */
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
        {
          type: 'container',
          content: [
            {
              type: 'html',
              html: '<h2>Valuation / Vehicle Details</h2>',
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
      ],
    },
  ];

  constructor(private fb: FormBuilder, private assetsSvc: AssetsService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.assetsForm.valid) {
      console.log(this.assetsForm.value);
      this.assetsSvc.addAsset(this.assetsForm.value as any);
      this.assetsForm.reset();
    }
  }
}
