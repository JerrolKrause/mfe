const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'loanProducts',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'loan-products',
      filename: 'remoteEntry.mjs',
      exposes: {
        // Relative from root
        './Module': './apps/loan/loan-products/src/app/loan-products.module.ts',
      },

      // For remotes (please adjust)
      // name: "loanProducts",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './apps/loan/loan-products/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      // remotes: {
      //     "appShell": "http://localhost:4200/remoteEntry.js",
      //     "customer": "http://localhost:4200/remoteEntry.js",
      //     "dashboard": "http://localhost:4201/remoteEntry.js",
      //     "assets": "http://localhost:4201/remoteEntry.js",
      //     "quoting": "http://localhost:4200/remoteEntry.js",
      //     "sandbox": "http://localhost:4202/remoteEntry.js",
      //     "teamMember": "http://localhost:4200/remoteEntry.js",
      //     "users": "http://localhost:4200/remoteEntry.js",

      // },

      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
