/**
 * Global environment variables
 */
export interface EnvironmentConfig {
  /** Is this production */
  isProd: boolean;
  /** Use dynamic module federation instead of static, default false */
  dynamicModuleFederation: boolean;
}

/**
 * Get env files from the window.ENV variable which are injected by /assets/config.js
 * @returns
 */
function getEnvironmentConfig(): EnvironmentConfig {
  // Access the global window.ENV object
  const env = (window as any).ENV || {};

  // Throw error if config not found
  if (!Object.keys(env).length) {
    console.error('Environment variables not found, falling back to defaults');
  }

  // Create a configuration object with default values
  const config: EnvironmentConfig = {
    isProd: env.isProd ?? false,
    dynamicModuleFederation: env.dynamicModuleFederation ?? false,
  };

  // Validate the config
  validateConfig(config);

  return config;
}

/**
 * Validate and add typesafety to env variables
 * @param config
 */
function validateConfig(config: EnvironmentConfig): void {
  if (typeof config.isProd !== 'boolean') {
    throw new Error(
      'Environment config validation error: "isProd" must be a boolean.'
    );
  }

  if (typeof config.dynamicModuleFederation !== 'boolean') {
    throw new Error(
      'Environment config validation error: "dynamicModuleFederation" must be a boolean.'
    );
  }
}

/**
 * Environment config
 */
export const ENV = getEnvironmentConfig();
