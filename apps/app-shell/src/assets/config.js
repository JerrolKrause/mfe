// Default/universal environment config
const baseConfig = {
  isProd: false, // Is this the prod environment
  dynamicModuleFederation: false, // Use static or dynamic module federation
};

// Attach a global object to the window with env values.
// Do not access the values in this file or window directly. Use the ENV interceptor.
// DO NOT PUT SECRET/SECURE INFORMATION IN THIS FILE SUCH AS KEYS/TOKENS/ETC.
window.ENV = (function () {
  switch (window.location.hostname) {
    // QA
    case 'qa.example.com':
      return {
        ...baseConfig,
      };
    // PROD
    case 'prod.example.com':
      return {
        ...baseConfig,
        isProd: true,
      };
    // DEV/Default
    default:
      return baseConfig;
  }
})();
