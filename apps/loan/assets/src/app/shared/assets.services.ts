import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { assetsStub } from './assets.data';
import { AssetsFormModel } from './assets.models';

/**
 * Service to manage assets.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  /** Assets with stub data */
  private _assets$ = new BehaviorSubject<AssetsFormModel[]>(assetsStub);
  public assets$ = this._assets$.asObservable();

  public assetsForm = this.fb.group({
    id: '',
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

  constructor(private fb: FormBuilder) {}

  /**
   * Load an existing asset into the assets form
   * @param asset - The asset to add.
   */
  setAssetForEdit(asset: AssetsFormModel) {
    this.assetsForm.reset();
    this.assetsForm.patchValue(asset as any);
  }

  /**
   * Save an asset. Adds a new asset if the ID is not present, otherwise updates the existing asset.
   * @param asset - The asset to save.
   */
  saveAsset(asset: AssetsFormModel): void {
    const currentAssets = this._assets$.value;
    // If id, update action
    if (asset.id) {
      const assetIndex = currentAssets.findIndex((a) => a.id === asset.id);
      if (assetIndex !== -1) {
        currentAssets[assetIndex] = asset;
        this._assets$.next([...currentAssets]);
        this.assetsForm.reset();
        return;
      }
    }
    // Add action
    // Generate random ID
    asset.id = this.generateId();
    this._assets$.next([...currentAssets, asset]);
    this.assetsForm.reset();
  }

  /**
   * Generates a unique ID for a new asset.
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Deletes an asset from the list.
   * @param assetToDelete - The asset to delete.
   */
  deleteAsset(assetToDelete: AssetsFormModel): void {
    const c = confirm('Are you sure you want to delete this asset?');
    if (!c) {
      return;
    }
    const currentAssets = this._assets$.value.filter(
      (asset) => asset.valuation.vin !== assetToDelete.valuation.vin
    );
    this._assets$.next(currentAssets);
  }
}
