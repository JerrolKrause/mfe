import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { IconsModule } from '$icons';
import { CreditProductsBuilderComponent } from './components/credit-products-builder/credit-products-builder.component';
import { LoanProductsBuilderComponent } from './components/loan-products-builder/loan-products-builder.component';
import { LoanProductsGridComponent } from './components/loan-products-grid/loan-products-grid.component';
import { NonCreditProductsBuilderComponent } from './components/non-credit-products-builder/non-credit-products-builder.component';
import { SubProductsGridComponent } from './components/sub-products-grid/sub-products-grid.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoanProductsComponent } from './loan-products.component';
import { appRoutes } from './loan-products.routes';
@NgModule({
  declarations: [
    LoanProductsComponent,
    TitleBarComponent,
    LoanProductsGridComponent,
    LoanProductsBuilderComponent,
    CreditProductsBuilderComponent,
    NonCreditProductsBuilderComponent,
    SubProductsGridComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule.forChild(appRoutes),
    MasterpageModule,
    FormsLibModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,

    DynamicDialogModule,
  ],
  providers: [DialogService, provideClientHydration()],
  bootstrap: [LoanProductsComponent],
})
export class LoanProductsModule {}
