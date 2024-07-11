import { toFormGroup } from '$forms';
import { AssetsModels } from '$shared';
import { Injectable } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { assetsStub } from './assets.data';

interface AssetForm extends AssetsModels.Asset {
  selected: boolean;
}

interface Address {
  address: string;
  zip: number;
}

interface User {
  nameFirst: string;
  nameLast: string;
  address: Address;
}

const user: User = {
  nameFirst: 'Jerrol',
  nameLast: 'Smith',
  address: {
    address: '12345',
    zip: 12345,
  },
};

type NewType<T> = [
  T | { value: T; disabled: boolean },
  (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
];

export type FormGroupConfig<T> = {
  [P in keyof T]: T[P] extends object ? FormGroupConfig<T[P]> : NewType<T[P]>;
};

/**
 * Utility type to make all properties of an interface nullable.
 */
type Nullable<T> = {
  [P in keyof T]?: T[P] | null | undefined;
};

/**
 * Service to manage assets.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  public userForm = this.fb.group<User>({
    nameFirst: 'Jerrol',
    nameLast: 'Smith',
    address: {
      address: '12345',
      zip: 12345,
    },
  });

  public user = this.userForm.value;
  public address = this.userForm.value.address;

  /** Assets with stub data */
  private _assets$ = new BehaviorSubject<AssetsModels.Asset[]>(assetsStub);
  public assets$ = this._assets$.asObservable();

  public assetsForm = this.fb.group<AssetForm>({
    id: '',
    selected: false,
    anyVehicles: null,
    vehiclesOnCreditBureau: 0,
    collateralVehicles: 0,
    who: '',
    category: '',
    type: '',
    collateral: null,
    reasonNotCollateral: '',
    valuation: {
      year: '2012',
      make: '',
      model: '',
      vin: '',
      mileage: '',
      mileageUpdated: '',
      value: '',
      by: '',
      ownedFreeAndClear: null,
      firstLienHolder: '',
      balance: '',
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
  });

  public valuation = this.assetsForm.value.valuation;

  public assetsForm2 = toFormGroup<AssetForm>(
    {
      id: '',
      selected: false,
      anyVehicles: null,
      vehiclesOnCreditBureau: 0,
      collateralVehicles: 0,
      who: '',
      category: '',
      type: '',
      collateral: null,
      reasonNotCollateral: '',
      valuation: {
        year: null,
        make: '',
        model: '',
        vin: '',
        mileage: '',
        mileageUpdated: '',
        value: '',
        by: '',
        ownedFreeAndClear: null,
        firstLienHolder: '',
        balance: '',
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

  constructor(private fb: FormBuilder) {
    this.assetsForm.reset();
    const assetsForm = this.assetsForm;
    const asset = assetsForm.value;
    const year = asset.valuation?.year;
    console.log(asset, year);

    // Form Builder
    // this.assetsForm2.resetDefaults();
    const assetsForm2 = this.assetsForm2;
    const asset2 = assetsForm2.value;
    const year2 = asset2.valuation?.year;

    console.log(asset2, year2);
    /**
    const asset = this.assetsForm.value;
    console.log('Asset', asset.valuation?.year);

    const valuation = this.assetsForm.controls['valuation'].value;
    //  const year = valuation.controls['year'];
    console.log('Temp', valuation);
     */
  }

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
