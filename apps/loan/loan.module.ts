import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loanRoutes } from './loan.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(loanRoutes)],
  providers: [],
  bootstrap: [],
})
export class LoanModule {}
