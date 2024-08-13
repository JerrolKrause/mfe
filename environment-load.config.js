// scripts/set-env.js
const config = require('./environment.config.js');

// Convert each key-value pair in the config object to an environment variable
Object.keys(config).forEach((key) => (process.env[key] = config[key]));

// Optionally log the environment variables for debugging
console.log('Environment variables set from config.js:');
// console.log(process.env);
