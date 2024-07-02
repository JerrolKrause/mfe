import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ModifyLoanProductsComponent } from './components/modify-loan-products/modify-loan-products.component';
import { NonCreditProductsBuilderComponent } from './components/non-credit-products-builder/non-credit-products-builder.component';
import { OptionalProductsGridComponent } from './components/optional-products-grid/optional-products-grid.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoanProductsComponent } from './loan-products.component';
import { appRoutes } from './loan-products.routes';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { SelectLoanIdComponent } from './routes/select-loan-id/select-loan-id.component';
import { SelectLoanTaskComponent } from './routes/select-loan-task/select-loan-task.component';

import { StateManagementModule } from '$state-management';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { LoanProductsService } from './shared/services/loan-products.service';

const uri =
  'https://income-verification-subgraph-dev-egg.cherrypie.alt.meanion.com/';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    LoanProductsComponent,
    TitleBarComponent,
    LoanProductsGridComponent,
    LoanProductsBuilderComponent,
    CreditProductsBuilderComponent,
    NonCreditProductsBuilderComponent,
    OptionalProductsGridComponent,
    NoContentComponent,
    SelectLoanIdComponent,
    SelectLoanTaskComponent,
    ModifyLoanProductsComponent,
    LoanDetailsComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    MasterpageModule,
    RouterModule.forChild(appRoutes),
    QuoteCalculatorModule,
    InputSwitchModule,
    FormsLibModule,
    FormsModule,
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
    StateManagementModule, // Needed for Apollo
  ],
  providers: [
    DialogService,
    LoanProductsService, // Needed for Apollo
    provideClientHydration(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [LoanProductsComponent],
})
export class LoanProductsModule {}
