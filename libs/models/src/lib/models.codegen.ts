import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  generates: {
    'libs/models/src/lib/global.models.ts': {
      plugins: [
        'libs/models/src/lib/plugins/pre.plugin.js',
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
        'libs/models/src/lib/plugins/post.plugin.js',
        'libs/models/src/lib/plugins/generate-queries-and-mutations.js',
      ],
      config: {
        wrapModule: {
          name: 'Models',
        },
      },
    },
    // Generate default queries and mutations from the schema
    'libs/models/src/introspection-result.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
