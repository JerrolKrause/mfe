import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap } from 'rxjs';
@Component({
  selector: 'lib-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  host: { hostID: crypto.randomUUID().toString() },
})
export class TitleComponent {
  // Mock http call that takes the loan ID and returns data about the loan
  private loanDataGet$ = (loanId: string) => {
    const userData =
      loanId === '533854'
        ? {
            nameFirst: 'Colleen',
            nameLast: 'Denning',
          }
        : {
            nameFirst: 'John',
            nameLast: 'Smith',
          };

    return new BehaviorSubject(userData);
  };

  // Generate the title from the loadID and the loandata
  public title$ = this.route.params.pipe(
    map((params) => params['loanId'] as string | null),
    filter((loanId) => !!loanId),
    mergeMap((loanId) =>
      this.loanDataGet$(loanId ?? '').pipe(
        map(
          (loanData) =>
            `#${loanId} | ${loanData.nameFirst} ${loanData.nameLast}`
        )
      )
    )
  );

  constructor(private route: ActivatedRoute) {}
}
