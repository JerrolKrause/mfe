import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
})
export class AssetsFormComponent implements OnInit {
  assetsForm = this.fb.group({
    anyVehicles: [null, Validators.required],
    vehiclesOnCreditBureau: [0, Validators.required],
    collateralVehicles: [0, Validators.required],
    who: ['Applicant', Validators.required],
    category: ['', Validators.required],
    type: ['', Validators.required],
    collateral: [null, Validators.required],
    reasonNotCollateral: [''],
    valuation: this.fb.group({
      year: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      vin: ['', Validators.required],
      mileage: ['', Validators.required],
      mileageUpdated: [''],
      value: ['', Validators.required],
      by: [''],
      ownedFreeAndClear: [null, Validators.required],
      firstLienHolder: [''],
      balance: [''],
      secondLienHolder: [''],
      autoCheckComplete: [null, Validators.required],
      vehicleInspection: [null, Validators.required],
      exceptionApproved: [null],
      qualifiedForDirectAuto: [null, Validators.required],
    }),
    salvageTitle: [null, Validators.required],
    purchaseMoney: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.assetsForm.valid) {
      console.log(this.assetsForm.value);
    }
  }
}
