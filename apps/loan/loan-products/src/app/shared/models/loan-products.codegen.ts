import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://income-verification-subgraph-dev-egg.cherrypie.alt.meanion.com/',
  documents: './apps/loan/**/*.ts',
  generates: {
    'apps/loan/loan-products/src/app/shared/models/loan-products.graphql.models.ts':
      {
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-apollo-angular',
        ],
      },
  },
};
export default config;
