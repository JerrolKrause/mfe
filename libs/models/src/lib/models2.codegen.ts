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
    'libs/models/src/lib/temp/angular.ts': {
      preset: 'near-operation-file',
      plugins: [
        'libs/models/src/lib/plugins/generate-queries-and-mutations.plugin.js',
      ],
      presetConfig: {
        baseTypesPath: 'types.ts',
      },
    },
    'libs/models/src/lib/temp/cleanup.ts': {
      plugins: [
        {
          'libs/models/src/lib/plugins/delete-dir-plugin.js': {
            directoryToDelete: 'libs/models/src/lib/temp',
          },
        },
      ],
    },
  },
};

export default config;
