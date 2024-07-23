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
      content: [...vehicleAssetForm],
    },
  ];

  constructor(public assetsSvc: AssetsService) {}

  onSubmit(): void {
    if (!this.assetsSvc.assetsForm.valid) {
      return;
    }
    const asset = this.assetsSvc.assetsForm.value;
    // @todo Remove when VIN lookup becomes available
    if (asset.valuation && !asset.valuation.year) {
      asset.valuation.year = '2018';
    }
    if (asset.valuation && !asset.valuation.make) {
      asset.valuation.make = 'Honda';
    }
    if (asset.valuation && !asset.valuation.model) {
      asset.valuation.model = 'CRV';
    }

    this.assetsSvc.saveAsset(asset as any);
  }
}
