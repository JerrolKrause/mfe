import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  // schema: 'https://graphqlzero.almansi.me/api',
  // schema: 'https://credit-app-processing-egg.brie.alt.meanion.com/christian',
  // schema: 'https://credit-app-processing-egg.brie.alt.meanion.com/develop',
  // schema: 'https://domain-gateway-egg.brie.alt.meanion.com/christian',
  schema: 'https://domain-gateway-egg.brie.alt.meanion.com/develop',
  overwrite: true,
  generates: {
    // Generate a graphql file from the endpoint
    'libs/models/src/lib/dist/global.graphql': {
      plugins: ['schema-ast'],
    },
    // Generate typescript models from the endpoint
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
