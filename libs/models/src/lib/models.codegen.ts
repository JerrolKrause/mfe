import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  overwrite: true,
  generates: {
    'libs/models/src/lib/dist/global.graphql': {
      plugins: ['schema-ast'],
    },
    'libs/models/src/lib/dist/global.models.ts': {
      plugins: [
        'libs/models/src/lib/plugins/prepend-to-models.plugin.js',
        'typescript',
        'libs/models/src/lib/plugins/append-to-models.plugin.js',
      ],
      config: {
        wrapModule: {
          name: 'Models',
        },
      },
    },
  },
};

export default config;
