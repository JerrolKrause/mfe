import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { BorrowerFormService } from '../../shared/borrower-form.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  public formModel: FormsLib.FormGenerator = [
    {
      label: 'Street Address',
      type: 'formField',
      formFieldType: 'text',
      field: 'address',
    },
    {
      label: 'Address 2',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameLast',
      hint: 'Optional',
    },
    {
      label: 'City',
      type: 'formField',
      formFieldType: 'text',
      field: 'city',
    },
    {
      type: 'row',
      columns: [
        {
          width: 6,
          type: 'column',
          content: [
            {
              label: 'State',
              type: 'formField',
              formFieldType: 'dropdown',
              field: 'state',
              options: [
                { label: 'AZ', value: 'az' },
                { label: 'CA', value: 'ca' },
                { label: 'TN', value: 'tn' },
              ],
            },
          ],
        },
        {
          width: 6,
          type: 'column',
          content: [
            {
              label: 'ZIP code',
              type: 'formField',
              formFieldType: 'zipcode',
              field: 'zipCode',
            },
          ],
        },
      ],
    },
  ];

  constructor(public svc: BorrowerFormService) {}

  public onFormCompleted() {
    this.svc.routeNext();
  }
}
