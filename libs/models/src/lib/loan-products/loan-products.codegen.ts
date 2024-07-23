import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://income-verification-subgraph-dev-egg.cherrypie.alt.meanion.com/',
  generates: {
    'libs/models/src/lib/loan-products/loan-products.graphql.models.ts': {
      plugins: [
        'libs/models/src/lib/pre.plugin.js',
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
        'libs/models/src/lib/post.plugin.js',
      ],

      config: {
        wrapModule: {
          name: 'LoanProductModels',
        },
      },
    },
  },
};

export default config;
