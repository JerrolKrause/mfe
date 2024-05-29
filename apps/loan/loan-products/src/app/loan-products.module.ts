import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CreditProductsBuilderComponent } from './components/credit-products-builder/credit-products-builder.component';
import { LoanProductsBuilderComponent } from './components/loan-products-builder/loan-products-builder.component';
import { LoanProductsGridComponent } from './components/loan-products-grid/loan-products-grid.component';
import { NonCreditProductsBuilderComponent } from './components/non-credit-products-builder/non-credit-products-builder.component';
import { SubProductsGridComponent } from './components/sub-products-grid/sub-products-grid.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoanProductsComponent } from './loan-products.component';
import { appRoutes } from './loan-products.routes';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { SelectLoanIdComponent } from './routes/select-loan-id/select-loan-id.component';
import { SelectLoanTaskComponent } from './routes/select-loan-task/select-loan-task.component';

@NgModule({
  declarations: [
    LoanProductsComponent,
    TitleBarComponent,
    LoanProductsGridComponent,
    LoanProductsBuilderComponent,
    CreditProductsBuilderComponent,
    NonCreditProductsBuilderComponent,
    SubProductsGridComponent,
    NoContentComponent,
    SelectLoanIdComponent,
    SelectLoanTaskComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule.forChild(appRoutes),
    QuoteCalculatorModule,
    MasterpageModule,
    InputSwitchModule,
    FormsLibModule,
    CardModule,
    TabViewModule,
    CheckboxModule,
    SplitButtonModule,
    OverlayPanelModule,
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
