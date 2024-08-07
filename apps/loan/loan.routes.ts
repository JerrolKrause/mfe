import { Route } from '@angular/router';
import { applicationRoutes } from '../../libs/shared/src';
import { NoContentComponent } from './loan-products/src/app/routes/no-content/no-content.component';

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
    /**
    {
      path: ':loanId',
      component: SelectLoanTaskComponent,
      data: { title: 'Loan Products' },
      children: [],
    },


    {
      path: '',
      component: SelectLoanIdComponent,
      data: { title: 'Loan Products' },
      children: [],
    },
     */
    {
      path: ':loanId/*',
      component: NoContentComponent,
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
    // Apps that are build out
    if (route.path === 'loan-products') {
      appRoutes.unshift({
        path: `:loanId/${route.path}`,
        loadChildren: () =>
          import('@loan-products/app/loan-products.module').then(
            (m) => m.LoanProductsModule
          ),
      });
    } else if (route.path === 'assets') {
      appRoutes.unshift({
        path: `:loanId/${route.path}`,
        loadChildren: () =>
          import('@assets/app/assets.module').then((m) => m.AssetsModule),
      });
    } else {
      // Default to no content component
      appRoutes.unshift({
        path: `:loanId/${route.path}`,
        component: NoContentComponent,
        data: { title: route.label },
        children: [],
      });
    }
  });

  return appRoutes;
};

export const loanRoutes = appRoutesGenerator(applicationRoutes);
