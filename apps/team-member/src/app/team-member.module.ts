import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { FeesModalComponent } from './components/loan-product-builder/fees/fees-modal.component';
import { LoanProductBuilderComponent } from './components/loan-product-builder/loan-product-builder.component';
import { NonCreditProductsModalComponent } from './components/loan-product-builder/non-credit-products/non-credit-products-modal.component';
import { HomeComponent } from './routes/home/home.component';
import { TeamMemberComponent } from './team-member.component';
import { appRoutes } from './team-member.routes';

@NgModule({
  declarations: [
    TeamMemberComponent,
    HomeComponent,
    LoanProductBuilderComponent,
    FeesModalComponent,
    NonCreditProductsModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsLibModule,
    MasterpageModule,
    QuoteCalculatorModule,
    CardModule,
    SliderModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
  ],
  providers: [],
  bootstrap: [TeamMemberComponent],
})
export class TeamMemberModule {}
