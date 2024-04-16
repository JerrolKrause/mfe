import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ProgressComponent } from './components/progress/progress.component';
import { QuoteCalculatorModule } from './components/quote-calculator/quote-calculator.module';
import { AppComponent } from './quoting.component';
import { appRoutes } from './quoting.routes';
import { AddressComponent } from './routes/address/address.component';
import { BorrowerInfoComponent } from './routes/borrower-info/borrower-info.component';
import { HomeComponent } from './routes/home/home.component';
import { IntroComponent } from './routes/intro/intro.component';
import { LoanReasonComponent } from './routes/loan-reason/loan-reason.component';
import { QuotingMasterpageComponent } from './routes/masterpage/masterpage.component';
import { Step1Component } from './routes/step1/step1.component';
import { WelcomeComponent } from './routes/welcome.component';
import { BorrowerFormService } from './shared/borrower-form.service';

@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    QuotingMasterpageComponent,
    WelcomeComponent,
    IntroComponent,
    BorrowerInfoComponent,
    HomeComponent,
    ProgressComponent,
    AddressComponent,
    LoanReasonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MasterpageModule,
    FormsLibModule,
    CardModule,
    SliderModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    QuoteCalculatorModule,
  ],
  providers: [provideClientHydration(), BorrowerFormService],
  bootstrap: [AppComponent],
})
export class QuotingModule {}
