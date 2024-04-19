import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { CustomerComponent } from './customer.component';
import { appRoutes } from './customer.routes';
import { HomeComponent } from './routes/home/home.component';
import { ProductsComponent } from './routes/products/products.component';
import { QuoteComponent } from './routes/quote/quote.component';

@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    QuoteComponent,
    QuoteComponent,
    ProductsComponent,
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
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [CustomerComponent],
})
export class CustomerModule {}
