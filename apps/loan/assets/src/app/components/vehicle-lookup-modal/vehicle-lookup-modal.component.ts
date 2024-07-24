import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-vehicle-lookup-modal',
  templateUrl: './vehicle-lookup-modal.component.html',
  styleUrl: './vehicle-lookup-modal.component.scss',
})
export class VehicleLookupModalComponent {
  searchForm = this.fb.group({
    make: [''],
    model: [''],
  });

  vehicles: SelectItem[] = [
    {
      label: 'ACURA ILX Base 2.0L 4D Sdn',
      value: { make: 'ACURA', model: 'ILX', details: 'Base 2.0L 4D Sdn' },
    },
    {
      label: 'ACURA ILX Base 2.0L 4D Sdn w/Prem Pkg',
      value: {
        make: 'ACURA',
        model: 'ILX',
        details: 'Base 2.0L 4D Sdn w/Prem Pkg',
      },
    },
    {
      label: 'ACURA ILX Base 2.0L 4D Sdn w/Tech Pkg',
      value: {
        make: 'ACURA',
        model: 'ILX',
        details: 'Base 2.0L 4D Sdn w/Tech Pkg',
      },
    },
    // Add more vehicles here
  ];
  selectedVehicle: any;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {}

  search(): void {
    // Implement search logic here
    console.log('Search clicked');
  }

  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
  }

  save(): void {
    console.log('Save clicked', this.selectedVehicle);
  }

  close(): void {
    this.ref.close();
  }

  refresh(): void {
    this.searchForm.reset();
    this.selectedVehicle = null;
  }
}
