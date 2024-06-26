import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';

import { IconsModule } from '$icons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
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
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    DropdownModule,
    FormsLibModule,
    MasterpageModule,
    TooltipModule,
    QuoteCalculatorModule,
    CardModule,
    CheckboxModule,
    SliderModule,
    InputTextModule,
    AccordionModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    IconsModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [CustomerComponent],
})
export class CustomerModule {}
