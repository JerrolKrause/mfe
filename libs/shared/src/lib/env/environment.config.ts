declare const process: any;

/**
 * Global environment variables
 */
export interface EnvironmentConfig {
  /** Is this production */
  IS_PROD: boolean;
  /** Use dynamic module federation instead of static, leave this false unless you really know what you are doing */
  DYNAMIC_MODULE_FEDERATION: boolean;
}

// Default/universal environment config
const baseConfig: EnvironmentConfig = {
  IS_PROD: false, // Is this the prod environment
  DYNAMIC_MODULE_FEDERATION: false, // Use static or dynamic module federation
};

/**
 * Get env config by determining which location we are on
 * @returns
 */
function getEnvironmentConfig(): EnvironmentConfig {
  // Check if we're running in Node.js or in the browser
  const isNode =
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
  // Get location
  const hostname = isNode
    ? process.env.HOSTNAME || 'localhost'
    : window.location.hostname;

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
        IS_PROD: true,
      };
    // DEV/Default
    default:
      return baseConfig;
  }
}

/**
 * Environment config
 */
export const ENV = getEnvironmentConfig();
