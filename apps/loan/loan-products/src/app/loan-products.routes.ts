import { applicationRoutes } from '$shared';
import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { LoanProductsComponent } from './loan-products.component';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { SelectLoanIdComponent } from './routes/select-loan-id/select-loan-id.component';
import { SelectLoanTaskComponent } from './routes/select-loan-task/select-loan-task.component';

/**
 * Generate loan routes from global routes file. Manually attach correct component for routing
 * @param routes
 * @returns
 */
export const appRoutesGenerator = (
  routes: {
    label: string;
    path: string;
  }[]
) => {
  const appRoutes: Route[] = [
    {
      path: ':loanId',
      component: SelectLoanTaskComponent,
      data: { title: 'Loan Products' },
      children: [],
    },

    {
      path: ':loanId/*',
      component: NoContentComponent,
      data: { title: 'Loan Products' },
      children: [],
    },
    {
      path: '',
      component: SelectLoanIdComponent,
      data: { title: 'Loan Products' },
      children: [],
    },
    {
      path: '**',
      component: NoContentComponent,
      data: { title: 'Loan Products' },
      children: [],
    },
  ];

  // Loop through available loan routes, create Route entity
  routes.forEach((route) => {
    // Default to nocontent component for apps that have not been created yet
    let comp: Type<unknown> = NoContentComponent;

    if (route.path === 'loan-products') {
      comp = LoanProductsComponent;
    }

    // Must be at front of array for matching
    appRoutes.unshift({
      path: `:loanId/${route.path}`,
      component: comp,
      data: { title: route.label },
      children: [],
    });
  });

  return appRoutes;
};

export const appRoutes = appRoutesGenerator(applicationRoutes);
