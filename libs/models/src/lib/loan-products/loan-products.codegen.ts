import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://income-verification-subgraph-dev-egg.cherrypie.alt.meanion.com/',
  // documents: 'libs/models/src/lib/loan-products/**/*.ts',
  generates: {
    'libs/models/src/lib/loan-products/loan-products.graphql.models.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
  },
};
export default config;
