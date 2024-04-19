import { Route } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './routes/home/home.component';
import { ProductsComponent } from './routes/products/products.component';
import { QuoteComponent } from './routes/quote/quote.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: CustomerComponent,
    data: { title: 'Borrower Information' },
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        data: { title: 'Borrower Information' },
      },
      {
        path: 'quote',
        component: QuoteComponent,
        data: { title: 'Borrower Information' },
      },
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Borrower Information' },
      },
    ],
  },
];
