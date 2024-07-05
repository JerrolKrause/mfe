import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetsFormModel } from './assets.models';

/**
 * Service to manage assets.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private assetsSubject: BehaviorSubject<AssetsFormModel[]> =
    new BehaviorSubject<AssetsFormModel[]>([]);
  public assets$: Observable<AssetsFormModel[]> =
    this.assetsSubject.asObservable();

  constructor() {
    // Mock data
    const initialAssets: AssetsFormModel[] = [
      {
        anyVehicles: true,
        vehiclesOnCreditBureau: 1,
        collateralVehicles: 1,
        who: 'Applicant',
        category: 'Auto or Truck',
        type: 'Sedan',
        collateral: true,
        reasonNotCollateral: '',
        valuation: {
          year: '2018',
          make: 'Toyota',
          model: 'Camry',
          vin: '1HGBH41JXMN109186',
          mileage: '50000',
          value: '15000',
          ownedFreeAndClear: true,
          autoCheckComplete: true,
          vehicleInspection: true,
          qualifiedForDirectAuto: true,
        },
        salvageTitle: false,
        purchaseMoney: false,
      },
      {
        anyVehicles: true,
        vehiclesOnCreditBureau: 1,
        collateralVehicles: 1,
        who: 'Co-Applicant',
        category: 'Auto or Truck',
        type: 'SUV',
        collateral: true,
        reasonNotCollateral: '',
        valuation: {
          year: '2020',
          make: 'Honda',
          model: 'CR-V',
          vin: '1HGBH41JXMN109187',
          mileage: '30000',
          value: '20000',
          ownedFreeAndClear: false,
          autoCheckComplete: true,
          vehicleInspection: true,
          qualifiedForDirectAuto: true,
        },
        salvageTitle: false,
        purchaseMoney: false,
      },
      {
        anyVehicles: true,
        vehiclesOnCreditBureau: 1,
        collateralVehicles: 1,
        who: 'Applicant',
        category: 'Auto or Truck',
        type: 'Truck',
        collateral: true,
        reasonNotCollateral: '',
        valuation: {
          year: '2015',
          make: 'Ford',
          model: 'F-150',
          vin: '1HGBH41JXMN109188',
          mileage: '70000',
          value: '18000',
          ownedFreeAndClear: true,
          autoCheckComplete: true,
          vehicleInspection: true,
          qualifiedForDirectAuto: true,
        },
        salvageTitle: true,
        purchaseMoney: false,
      },
    ];
    this.assetsSubject.next(initialAssets);
  }

  /**
   * Adds a new asset to the list.
   * @param asset - The asset to add.
   */
  addAsset(asset: AssetsFormModel): void {
    const currentAssets = this.assetsSubject.value;
    this.assetsSubject.next([...currentAssets, asset]);
  }

  /**
   * Edits an existing asset in the list.
   * @param updatedAsset - The updated asset details.
   */
  editAsset(updatedAsset: AssetsFormModel): void {
    const currentAssets = this.assetsSubject.value;
    const assetIndex = currentAssets.findIndex(
      (asset) => asset.valuation.vin === updatedAsset.valuation.vin
    );
    currentAssets[assetIndex] = updatedAsset;
    this.assetsSubject.next([...currentAssets]);
  }

  /**
   * Deletes an asset from the list.
   * @param assetToDelete - The asset to delete.
   */
  deleteAsset(assetToDelete: AssetsFormModel): void {
    const currentAssets = this.assetsSubject.value.filter(
      (asset) => asset.valuation.vin !== assetToDelete.valuation.vin
    );
    this.assetsSubject.next(currentAssets);
  }
}
