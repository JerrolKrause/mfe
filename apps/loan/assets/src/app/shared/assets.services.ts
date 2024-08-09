import { toFormGroup } from '$forms';
import { AssetsModels, assetsStub } from '$shared';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AssetForm extends AssetsModels.Asset {
  $$computed: {
    noVinToggle: boolean;
    selected: boolean;
  };
}

/**
 * Service to manage assets.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  /** Assets with stub data */
  private _assets$ = new BehaviorSubject<AssetsModels.Asset[]>(assetsStub);
  public assets$ = this._assets$.asObservable();

  public assetsForm = toFormGroup<AssetForm>(
    {
      $$computed: {
        selected: false,
        noVinToggle: false,
      },
      id: '',
      anyVehicles: null,
      vehiclesOnCreditBureau: null,
      collateralVehicles: null,
      who: 0,
      category: 0,
      type: '',
      collateral: null,
      reasonNotCollateral: '',
      valuation: {
        year: '',
        make: '',
        model: '',
        vin: '',
        mileage: null,
        mileageUpdated: null,
        value: null,
        by: '',
        ownedFreeAndClear: null,
        firstLienHolder: '',
        balance: null,
        secondLienHolder: '',
        autoCheckComplete: null,
        vehicleInspection: null,
        exceptionApproved: null,
        qualifiedForDirectAuto: null,
      },
      salvageTitle: null,
      purchaseMoney: null,
      equity: null,
      monthlyPayment: null,
    },
    true
  );

  constructor() {}

  /**
   * Load an existing asset into the assets form
   * @param asset - The asset to add.
   */
  setAssetForEdit(asset: AssetsModels.Asset) {
    this.assetsForm.reset();
    this.assetsForm.patchValue(asset);
  }

  /**
   * Save an asset. Adds a new asset if the ID is not present, otherwise updates the existing asset.
   * @param asset - The asset to save.
   */
  saveAsset(asset: AssetsModels.Asset): void {
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
  deleteAsset(assetToDelete: AssetsModels.Asset): void {
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
