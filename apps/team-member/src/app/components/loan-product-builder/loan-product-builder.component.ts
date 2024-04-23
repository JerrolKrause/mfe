import { FormsLib } from '$forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { TeamMemberService } from '../../shared/services/team-member.service';
import { FeesModalComponent } from './fees/fees-modal.component';
import { NonCreditProductsModalComponent } from './non-credit-products/non-credit-products-modal.component';

@Component({
  selector: 'app-loan-product-builder',
  templateUrl: './loan-product-builder.component.html',
  styleUrl: './loan-product-builder.component.scss',
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanProductBuilderComponent {
  public loanProductsModel: FormsLib.FormGenerator = [
    {
      label: 'Cash to Customer',
      type: 'formField',
      formFieldType: 'number',
      mode: 'currency',
      field: 'cashToCustomer',
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
      field: 'cashAdvance',
    },
    {
      type: 'html',
      html: '<hr/>',
    },
    {
      label: 'Due Day',
      type: 'formField',
      formFieldType: 'number',
      field: 'dueDay',
      hint: 'Valid Due Days are from the 1st to the 16th',
    },
    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 6,
          content: [
            {
              label: 'Fees',
              type: 'formField',
              formFieldType: 'number',
              mode: 'currency',
              field: 'fees',
            },
          ],
        },
        {
          type: 'column',
          width: 6,
          content: [
            {
              cssClasses: 'p-button w-100 text-center mt-4',
              type: 'button',
              label: 'Select',
              cmd: (btn) => this.openFeesModal(btn),
            },
          ],
        },
      ],
    },
    //
    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 6,
          content: [
            {
              label: 'Non-Credit',
              type: 'formField',
              formFieldType: 'number',
              mode: 'currency',
              field: 'nonCreditProducts',
            },
          ],
        },
        {
          type: 'column',
          width: 6,
          content: [
            {
              cssClasses: 'p-button w-100 text-center mt-4',
              type: 'button',
              label: 'Select',
              cmd: (btn) => this.openNonCreditModal(btn),
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
    cashToCustomer: '2100.00',
    payoffs: '',
    cashAdvance: '2100.00',
    fees: '',
    nonCreditProducts: '',
    dueDay: '1',
    creditors: this.fb.array([false, false, false, false]),
    assets: this.fb.array([false, false, false, false]),
  });

  public loanProducts: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    public teamSvc: TeamMemberService
  ) {}

  public openFeesModal(btn?: FormsLib.Button | null) {
    this.dialogService.open(FeesModalComponent, {
      header: 'Much Fees',
      width: '50vw',
      modal: true,
      dismissableMask: true,
      data: btn?.data,
    });
  }

  public openNonCreditModal(btn?: FormsLib.Button | null) {
    this.dialogService.open(NonCreditProductsModalComponent, {
      header: 'Much Products',
      width: '50vw',
      modal: true,
      dismissableMask: true,
      data: btn?.data,
    });
  }

  public generateProducts() {
    this.loanProducts = [...this.teamSvc.loanProducts];
  }

  public productDelete(index: number) {
    this.loanProducts = this.loanProducts.filter((_p, i) => i !== index);
  }

  /**
   * Toggle a boolean checkbox array
   * @param array
   * @param i
   */
  public toggleFormArray(array: string, i: number) {
    const control = this.loanProductsForm?.get(array)?.get(i.toString());

    control?.patchValue(!control.value);
  }

  public onFormCompleted($event: any) {
    console.log($event);
  }
}
