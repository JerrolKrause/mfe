const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  'libs/masterpage/src/index.ts', // Add the path to your shared library here
]);

module.exports = {
  output: {
    uniqueName: 'appShell',
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
      remotes: {
        assets: 'assets@http://localhost:4201/remoteEntry.js',
        'loan-products': 'loan-products@http://localhost:4202/remoteEntry.js',
      },
      // For remotes (please adjust)
      // name: "appShell",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './apps/app-shell/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      // remotes: {
      //     "customer": "http://localhost:4200/remoteEntry.js",
      //     "dashboard": "http://localhost:4201/remoteEntry.js",
      //     "assets": "http://localhost:4200/remoteEntry.js",
      //     "loanProducts": "http://localhost:4200/remoteEntry.js",
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
        primeng: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        primeicons: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        // Share the masterpage library
        masterpage: {
          singleton: true,
          import: 'libs/masterpage/src/index.ts',
          // requiredVersion: 'auto',
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
