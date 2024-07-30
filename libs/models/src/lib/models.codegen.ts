import type { CodegenConfig } from '@graphql-codegen/cli';

// Filename and directory constants
const MODELS_FILE = 'libs/models/src/lib/global.models.ts';
const GRAPHQL_FILE = 'libs/models/src/lib/graphql/graphql.ts';

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
      },
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
