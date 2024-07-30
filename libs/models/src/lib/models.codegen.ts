import type { CodegenConfig } from '@graphql-codegen/cli';
import fs from 'fs';

// Filename and directory constants
const MODELS_FILE = 'libs/models/src/lib/global.models.ts';
const SCHEMA_FILE = 'libs/models/src/lib/schema/introspection-result.json';
const GRAPHQL_FILE = 'libs/models/src/lib/graphql/graphql.ts';

// Import JSON schema to pass to generate-queries-and-mutations.js plugin
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
    // Generate queries and mutations based on the schema
    [GRAPHQL_FILE]: {
      plugins: [
        './libs/models/src/lib/plugins/generate-queries-and-mutations.js',
      ],
    },
  },
};

export default config;
