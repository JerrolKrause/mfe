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
import { TimelineModule } from 'primeng/timeline';
import { QuotingMasterpageComponent } from './components/masterpage/masterpage.component';
import { ProgressComponent } from './components/progress/progress.component';
import { QuoteCalculatorModule } from './components/quote-calculator/quote-calculator.module';
import { AppComponent } from './quoting.component';
import { appRoutes } from './quoting.routes';
import { AddressComponent } from './routes/address/address.component';
import { BorrowerInfoComponent } from './routes/borrower-info/borrower-info.component';
import { HomeComponent } from './routes/home/home.component';
import { IntroComponent } from './routes/intro/intro.component';
import { LoanReasonComponent } from './routes/loan-reason/loan-reason.component';
import { Step1Component } from './routes/step1/step1.component';
import { WelcomeComponent } from './routes/welcome.component';
import { BorrowerFormService } from './shared/borrower-form.service';
import { V1Component } from './routes/v1/v1.component';
import { V2Component } from './routes/v2/v2.component';
import { V3Component } from './routes/v3/v3.component';

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
    V1Component,
    V2Component,
    V3Component,
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
    TimelineModule,
  ],
  providers: [provideClientHydration(), BorrowerFormService],
  bootstrap: [AppComponent],
})
export class QuotingModule {}
