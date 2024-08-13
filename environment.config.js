// Default/universal environment config
const baseConfig = {
  isProd: false, // Is this the prod environment
  dynamicModuleFederation: false, // Use static or dynamic module federation
};

// Check if we're running in Node.js or in the browser
const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
const hostname = isNode
  ? process.env.HOSTNAME || 'localhost'
  : window.location.hostname;

// Function to generate the environment config
const generateConfig = () => {
  switch (hostname) {
    // QA
    case 'qa.example.com':
    case 'qa':
      return {
        ...baseConfig,
      };
    // PROD
    case 'prod.example.com':
    case 'prod':
      return {
        ...baseConfig,
        isProd: true,
      };
    // DEV/Default
    default:
      return baseConfig;
  }
};

// For Node.js
if (isNode) {
  module.exports = generateConfig();
} else {
  // For Browser
  window.ENV = generateConfig();
}
