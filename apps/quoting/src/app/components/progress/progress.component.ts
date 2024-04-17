import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProgressComponent {
  public pages = [
    'Loan Information',
    'Borrower Information',
    'Income',
    'Assets',
    'Expenses',
    'Review',
  ];
}
