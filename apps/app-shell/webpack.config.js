const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  'libs/masterpage/src/index.ts',
  'libs/icons/src/index.ts',
]);

// const isDynamicFederation = process.env.dynamicModuleFederation === 'false';
const isDynamicFederation = false;

const plugins = !isDynamicFederation
  ? []
  : [
      new ModuleFederationPlugin({
        library: { type: 'module' },
        remotes: {
          assets: 'assets@http://localhost:4201/remoteEntry.js',
          'loan-products': 'loan-products@http://localhost:4202/remoteEntry.js',
        },
        // Optionally, you can also dynamically set the remotes in the runtime code, if required
        // exposes: {
        //     './Component': './apps/app-shell/src/app/app.component.ts',
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
          '@angular/forms': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
          },
          rxjs: {
            singleton: true,
            strictVersion: true,
          },
          graphql: {
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
          },
          icons: {
            singleton: true,
            import: 'libs/icons/src/index.ts',
          },
          ...sharedMappings.getDescriptors(),
        }),
      }),
      sharedMappings.getPlugin(),
    ];

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
  plugins: plugins,
};
