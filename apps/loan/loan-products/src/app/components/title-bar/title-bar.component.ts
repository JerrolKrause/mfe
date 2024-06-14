import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { distinctUntilChanged, map } from 'rxjs';
import { LoanProductsService } from '../../shared/services/loan-products.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  public title$ = this.route.params.pipe(
    map((params) => {
      const loanId = params['loanId'] as string | null;
      if (!loanId) {
        return 'No Loan ID Found';
      }
      return loanId === '533854'
        ? `#${loanId} | Colleen Denning`
        : `#${loanId} | John Smith`;
    })
  );

  public loanIsBeingWorkedOn$ = this.lpSvc.state$.pipe(
    map((state) => state.loanIsBeingWorkedOn),
    distinctUntilChanged()
  );

  constructor(
    private route: ActivatedRoute,
    private lpSvc: LoanProductsService
  ) {}

  public isCentral(e: InputSwitchChangeEvent) {
    this.lpSvc.stateChange({ isCentral: e.checked });
  }

  public isLocked(e: InputSwitchChangeEvent) {
    this.lpSvc.stateChange({ isLocked: e.checked });
  }
}
