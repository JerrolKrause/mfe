import { FormsLib } from '$forms';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loan-product-builder',
  templateUrl: './loan-product-builder.component.html',
  styleUrl: './loan-product-builder.component.scss',
})
export class LoanProductBuilderComponent {
  public loanProductsModel: FormsLib.FormGenerator = [
    {
      label: 'Cash to Customer',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'cash',
    },
    {
      label: 'Payoffs',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'payoffs',
    },
    {
      label: 'Base Cash Advance',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'advance',
    },
    {
      type: 'html',
      html: '<hr/>',
    },

    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 8,
          content: [
            {
              label: 'Fees',
              type: 'formField',
              formFieldType: 'number',
              mode: 'currency',
              field: 'advance',
            },
          ],
        },
        {
          type: 'column',
          width: 4,
          content: [
            {
              cssClasses: 'p-button',
              type: 'button',
              label: 'Enter Fees',
              cmd: (btn) => this.openFeesModal(btn),
            },
          ],
        },
      ],
    },
  ];

  public formOptions: FormsLib.FormOptions = {
    submitButton: {
      hide: true,
    },
  };

  public loanProductsForm = this.fb.group({
    cash: '',
    payoffs: '',
    advance: '',
    fees: '',
  });

  constructor(private fb: FormBuilder) {}

  public openFeesModal(btn: FormsLib.Button | null | undefined) {
    console.log('openFeesModal', btn);
  }

  public onFormCompleted($event: any) {
    console.log($event);
  }
}
