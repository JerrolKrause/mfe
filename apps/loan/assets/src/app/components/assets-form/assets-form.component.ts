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

    this.assetsSvc.saveAsset(this.assetsSvc.assetsForm.value as any);
  }
}
