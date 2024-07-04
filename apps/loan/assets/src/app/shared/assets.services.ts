import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Asset {
  who: string;
  category: string;
  type: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  value: string;
  ownedFreeAndClear: boolean;
  salvageTitle: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private assetsSubject: BehaviorSubject<Asset[]> = new BehaviorSubject<
    Asset[]
  >([]);
  public assets$: Observable<Asset[]> = this.assetsSubject.asObservable();

  constructor() {
    // Mock data
    const initialAssets: Asset[] = [
      {
        who: 'Applicant',
        category: 'Auto or Truck',
        type: 'Sedan',
        year: '2018',
        make: 'Toyota',
        model: 'Camry',
        vin: '1HGBH41JXMN109186',
        mileage: '50000',
        value: '15000',
        ownedFreeAndClear: true,
        salvageTitle: false,
      },
      {
        who: 'Co-Applicant',
        category: 'Auto or Truck',
        type: 'SUV',
        year: '2020',
        make: 'Honda',
        model: 'CR-V',
        vin: '1HGBH41JXMN109187',
        mileage: '30000',
        value: '20000',
        ownedFreeAndClear: false,
        salvageTitle: false,
      },
      {
        who: 'Applicant',
        category: 'Auto or Truck',
        type: 'Truck',
        year: '2015',
        make: 'Ford',
        model: 'F-150',
        vin: '1HGBH41JXMN109188',
        mileage: '70000',
        value: '18000',
        ownedFreeAndClear: true,
        salvageTitle: true,
      },
    ];
    this.assetsSubject.next(initialAssets);
  }

  addAsset(asset: Asset): void {
    const currentAssets = this.assetsSubject.value;
    this.assetsSubject.next([...currentAssets, asset]);
  }

  editAsset(updatedAsset: Asset): void {
    const currentAssets = this.assetsSubject.value;
    const assetIndex = currentAssets.findIndex(
      (asset) => asset.vin === updatedAsset.vin
    );
    currentAssets[assetIndex] = updatedAsset;
    this.assetsSubject.next([...currentAssets]);
  }

  deleteAsset(assetToDelete: Asset): void {
    const currentAssets = this.assetsSubject.value.filter(
      (asset) => asset.vin !== assetToDelete.vin
    );
    this.assetsSubject.next(currentAssets);
  }
}
