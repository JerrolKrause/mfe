import { FormsLib } from '$forms';
import { LoanCalculator } from '$quote-calculator';
import { QUOTE_FORM_ACTIONS, UserIds } from '$shared';
import { SocketService } from '$state-management';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, map, take } from 'rxjs';
import { TeamMemberService } from '../../shared/services/team-member.service';
import { FeesModalComponent } from './fees/fees-modal.component';
import { NonCreditProductsModalComponent } from './non-credit-products/non-credit-products-modal.component';

interface State {
  customerConnected: boolean;
  customerPreferences: LoanCalculator.Quote | null;
  customerLocation: string;
}
@Component({
  selector: 'app-loan-product-builder',
  templateUrl: './loan-product-builder.component.html',
  styleUrl: './loan-product-builder.component.scss',
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoanProductBuilderComponent implements OnInit {
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
      label: 'Term',
      type: 'formField',
      formFieldType: 'number',
      field: 'term',
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
    /**
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
      ],

    },*/
  ];

  public loanAdvanceOptions: MenuItem[] = [
    {
      label: 'Approve',
    },
    {
      label: 'Decline',
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
    term: '12',
    creditors: this.fb.array([false, false, false, false]),
    assets: this.fb.array([false, false, false, false]),
  });

  public loanProducts: any[] = [];
  public lpVisibility: boolean[] = [];

  public lpState$ = new BehaviorSubject<State>({
    customerConnected: false,
    customerPreferences: null,
    customerLocation: '',
  });

  public loanId$ = this.route.params.pipe(map((params) => params['loanID']));

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    public teamSvc: TeamMemberService,
    private socket: SocketService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.loanId$.pipe(take(1)).subscribe((loanId: string) => {
      const borrowerName = loanId.includes('84')
        ? 'Smith, John'
        : 'Johnson, James';
      this.title.setTitle(`#${loanId} | Loan Products | ${borrowerName}`);
    });

    this.socket.onMessageReceived((msg) => {
      const payload = JSON.parse(msg) as { type: string; data?: any };
      if (payload.type === 'CUSTOMER_CONNECTED') {
        this.stateChange({
          customerConnected: true,
        });
      }
      if (payload.type === 'PREF_CHANGE') {
        this.stateChange({ customerPreferences: payload.data });
      }
      if (payload.type === 'LOCATION_CHANGE') {
        console.log(payload);
        this.stateChange({ customerLocation: payload.data });
      }
    });
  }

  private stateChange(stateNew: Partial<State>) {
    this.lpState$
      .pipe(take(1))
      .subscribe((stateOld) =>
        this.lpState$.next({ ...stateOld, ...stateNew })
      );
  }

  public openFeesModal(btn?: FormsLib.Button | null) {
    this.dialogService.open(FeesModalComponent, {
      header: 'Fees',
      width: '50vw',
      modal: true,
      dismissableMask: true,
      data: btn?.data,
    });
  }

  public openNonCreditModal() {
    this.dialogService.open(NonCreditProductsModalComponent, {
      header: 'Non Credit Products',
      width: '50vw',
      modal: true,
      dismissableMask: true,
    });
  }

  public generateProducts() {
    const count = this.loanProducts.length;
    const product = this.teamSvc.loanProducts[count];
    if (product) {
      this.loanProducts = [
        ...this.loanProducts,
        this.teamSvc.loanProducts[count],
      ];
      this.updateLPVisibility();
    }
  }

  public generateAllProducts() {
    this.loanProducts = [...this.teamSvc.loanProducts];
    this.updateLPVisibility();
  }

  public updateLPVisibility() {
    const total = this.loanProducts.length;
    if (total >= 6) {
      this.lpVisibility = [true, true, true, true];
    } else if (total >= 5) {
      this.lpVisibility = [true, true, true];
    } else if (total >= 2) {
      this.lpVisibility = [true, true];
    } else if (total >= 1) {
      this.lpVisibility = [true];
    } else {
      this.lpVisibility = [];
    }
  }

  public sendToCustomer() {
    console.log(this.loanProducts);
    this.socket.sendMessageToUser(
      UserIds.customer,
      JSON.stringify(QUOTE_FORM_ACTIONS.PRODUCTS_READY(this.loanProducts))
    );
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
