import type { CodegenConfig } from '@graphql-codegen/cli';
import fs from 'fs';
const introspectionSchema = JSON.parse(
  fs.readFileSync(
    'libs/models/src/lib/schema/introspection-result.json',
    'utf-8'
  )
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const introspectionSchema = require('libs/models/src/lib/schema/introspection-result.json');
// eslint-disable-next-line @nx/enforce-module-boundaries
// import * as introspectionSchema from 'libs/models/src/lib/schema/introspection-result.json';
// import introspectionSchema = require('libs/models/src/lib/schema/introspection-result.json');
console.log('introspectionSchema', introspectionSchema);

// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  generates: {
    'libs/models/src/lib/global.models.ts': {
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
    // Generate default queries and mutations from the schema
    'libs/models/src/lib/schema/introspection-result.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
