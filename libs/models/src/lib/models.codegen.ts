import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  // schema: 'libs/models/src/lib/graphql/global.graphql',
  schema: 'https://graphqlzero.almansi.me/api',
  overwrite: true,
  generates: {
    'libs/models/src/lib/temp/global.graphql': {
      plugins: ['schema-ast'],
    },
    'libs/models/src/lib/temp/global.models.ts': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types.ts',
      },
      plugins: [
        'libs/models/src/lib/plugins/pre.plugin.js',
        'typescript',
        'libs/models/src/lib/plugins/post.plugin.js',
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
