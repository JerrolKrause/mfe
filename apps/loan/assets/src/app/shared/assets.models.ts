export interface ValuationDetails {
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  mileageUpdated?: string;
  value: string;
  by?: string;
  ownedFreeAndClear: boolean | null;
  firstLienHolder?: string;
  balance?: string;
  secondLienHolder?: string;
  autoCheckComplete: boolean | null;
  vehicleInspection: boolean | null;
  exceptionApproved?: boolean | null;
  qualifiedForDirectAuto: boolean | null;
}

export interface AssetsFormModel {
  id?: string | null;
  anyVehicles: boolean | null;
  vehiclesOnCreditBureau: number;
  collateralVehicles: number;
  who: string;
  category: string;
  type: string;
  collateral: boolean | null;
  reasonNotCollateral?: string;
  valuation: ValuationDetails;
  salvageTitle: boolean | null;
  purchaseMoney: boolean | null;
  equity?: number | null;
  monthlyPayment?: number | null;
}
