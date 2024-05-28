import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  public loanId$ = this.route.params.pipe(
    map((params) => params['loanId'] as string | null)
  );

  public applications = [
    {
      loanID: '533854',
      borrowerNameFirst: 'Colleen',
      borrowerNameLast: 'Denning',
    },
    {
      loanID: '533734',
      borrowerNameFirst: 'Smith',
      borrowerNameLast: 'John',
    },
  ];

  navItems = [
    { label: 'Applicant Info', path: 'applicant-info', completed: true },
    { label: 'Assets', path: 'assets', completed: true },
    { label: 'Income', path: 'income', completed: true },
    { label: 'Expenses', path: 'expenses', completed: true },
    {
      label: 'Non-Credit Products',
      path: 'non-credit-products',
      completed: false,
    },
    { label: 'Loan Products', path: 'loan-products', completed: false },
    { label: 'Notes Review', path: 'notes-review', completed: false },
    { label: 'Verifications', path: 'verifications', completed: true },
    { label: 'Decision', path: 'decision', completed: false },
    { label: 'Pre-Closing', path: 'pre-closing', completed: true },
    {
      label: 'eSignature Closing',
      path: 'esignature-closing',
      completed: false,
    },
  ];

  constructor(private route: ActivatedRoute) {}
}
