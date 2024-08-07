const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "customer": "http://localhost:4200/remoteEntry.js",
    "dashboard": "http://localhost:4201/remoteEntry.js",
    "assets": "http://localhost:4200/remoteEntry.js",
    "loanProducts": "http://localhost:4200/remoteEntry.js",
    "quoting": "http://localhost:4200/remoteEntry.js",
    "sandbox": "http://localhost:4202/remoteEntry.js",
    "teamMember": "http://localhost:4200/remoteEntry.js",
    "users": "http://localhost:4200/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
