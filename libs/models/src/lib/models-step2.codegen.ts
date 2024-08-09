import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'libs/models/src/lib/dist/global.graphql',
  overwrite: true,
  documents: [
    'libs/models/src/lib/temp/**/*.gql',
    'libs/models/src/lib/dist/global.models.ts',
  ],
  generates: {
    // Generate default queries and mutations
    generateQueriesAndMutations: {
      preset: 'near-operation-file',
      plugins: [
        'libs/models/src/lib/plugins/generate-queries-and-mutations.plugin.js',
      ],
      presetConfig: {
        baseTypesPath: 'types.ts',
      },
    },
  },
};

export default config;
