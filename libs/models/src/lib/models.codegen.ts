import type { CodegenConfig } from '@graphql-codegen/cli';

// Generate graph models and dependencies
const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  overwrite: true,
  generates: {
    /**
    removeDist: {
      plugins: [
        {
          'libs/models/src/lib/plugins/delete-dir-plugin.js': {
            directoryToDelete: 'libs/models/src/lib/dist',
          },
        },
      ],
    },
 */
    'libs/models/src/lib/dist/global.graphql': {
      plugins: ['schema-ast'],
    },
    'libs/models/src/lib/dist/global.models.ts': {
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
