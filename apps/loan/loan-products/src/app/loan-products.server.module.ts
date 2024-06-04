import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { LoanProductsComponent } from './loan-products.component';
import { LoanProductsModule } from './loan-products.module';

@NgModule({
  imports: [LoanProductsModule, ServerModule],
  bootstrap: [LoanProductsComponent],
})
export class AppServerModule {}
