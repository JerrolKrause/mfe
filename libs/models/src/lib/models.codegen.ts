import type { CodegenConfig } from '@graphql-codegen/cli';
import fs from 'fs';

// Filename and directory constants
const MODELS_FILE = 'libs/models/src/lib/global.models.ts';
const SCHEMA_FILE = 'libs/models/src/lib/schema/introspection-result.json';

// Import JSON schema to pass to generate-queries-and-mutations.js plugin
// The plugin code errors out if using require or a normal import as statement
const introspectionSchema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf-8'));
// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  generates: {
    [MODELS_FILE]: {
      plugins: [
        'libs/models/src/lib/plugins/pre.plugin.js',
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
        'libs/models/src/lib/plugins/post.plugin.js',
        // `introspection-result.json` must be present before running generate-queries-and-mutations.js
        // If not present, comment out below line, run `npm run models` to generate and then uncomment after that file exists
        'libs/models/src/lib/plugins/generate-queries-and-mutations.js',
      ],
      config: {
        wrapModule: {
          name: 'Models',
        },
        schema: introspectionSchema,
      },
    },
    // Generate schema which will be used to generate queries and mutations
    [SCHEMA_FILE]: {
      plugins: ['introspection'],
    },
  },
};

export default config;
