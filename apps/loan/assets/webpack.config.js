const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'assets',
  exposes: {
    './Module': './apps/loan/assets/src/app/assets.module.ts', // Corrected path
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});

module.exports.output = {
  uniqueName: 'assets',
  publicPath: 'auto',
  scriptType: 'module', // Add this line
};
