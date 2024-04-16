import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { BorrowerFormService } from '../../shared/borrower-form.service';

@Component({
  selector: 'app-borrower-info',
  templateUrl: './borrower-info.component.html',
  styleUrl: './borrower-info.component.scss',
})
export class BorrowerInfoComponent {
  public formModel: FormsLib.FormGenerator = [
    {
      label: 'First Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameFirst',
    },
    {
      label: 'Last Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameLast',
    },
  ];

  constructor(public svc: BorrowerFormService) {}

  public onFormCompleted() {
    this.svc.routeNext();
  }
}
