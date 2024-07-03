import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
})
export class AssetsFormComponent implements OnInit {
  assetsForm = this.fb.group({
    anyVehicles: [false],
    vehiclesOnCreditBureau: [0],
    collateralVehicles: [0],
    vehicles: this.fb.array([]),
    salvageTitle: [null, Validators.required],
    purchaseMoney: [null],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.assetsForm);
  }

  onSubmit() {
    if (this.assetsForm.valid) {
      console.log(this.assetsForm.value);
    }
  }
}
