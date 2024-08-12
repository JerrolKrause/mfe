const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../../tsconfig.base.json'), [
  'libs/masterpage/src/index.ts',
  'libs/icons/src/index.ts',
]);

module.exports = {
  output: {
    uniqueName: 'assets',
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
      name: 'assets',
      filename: 'remoteEntry.mjs',
      exposes: {
        // Relative from root
        //
        './Module': 'apps/loan/assets/src/app/assets.module.ts',
      },
      // For remotes (please adjust)
      // name: "assets",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './apps/loan/assets/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      // remotes: {
      //     "appShell": "http://localhost:4200/remoteEntry.js",
      //     "customer": "http://localhost:4200/remoteEntry.js",
      //     "dashboard": "http://localhost:4201/remoteEntry.js",
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
        '@fortawesome/angular-fontawesome': {
          singleton: true,
          strictVersion: true,
        },
        '@fortawesome/fontawesome-free': {
          singleton: true,
          strictVersion: true,
        },
        '@fortawesome/fontawesome-svg-core': {
          singleton: true,
          strictVersion: true,
        },
        '@fortawesome/free-brands-svg-icons': {
          singleton: true,
          strictVersion: true,
        },
        'free-regular-svg-icons': {
          singleton: true,
          strictVersion: true,
        },
        '@fortawesome/free-solid-svg-icons': {
          singleton: true,
          strictVersion: true,
        },
        // Share the masterpage library
        masterpage: {
          singleton: true,
          import: 'libs/masterpage/src/index.ts',
          // requiredVersion: 'auto',
        },
        icons: {
          singleton: true,
          import: 'libs/icons/src/index.ts',
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
