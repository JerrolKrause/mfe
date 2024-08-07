const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'loan-products',

  exposes: {
    './Module': './apps/loan/loan-products/src/app/loan-products.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
