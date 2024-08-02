import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'libs/models/src/lib/temp/global.graphql',
  overwrite: true,
  documents: [
    'libs/models/src/lib/temp/**/*.gql',
    'libs/models/src/lib/temp/global.models.ts',
  ],
  generates: {
    'libs/models/src/lib/temp/angular.ts': {
      config: {
        // serviceProvidedInRoot: false,
      },
      preset: 'near-operation-file',
      plugins: [
        'libs/models/src/lib/plugins/generate-queries-and-mutations.plugin.js',
        // 'typescript-apollo-angular',
      ],
      presetConfig: {
        baseTypesPath: 'types.ts',
      },
    },
  },
};

export default config;
