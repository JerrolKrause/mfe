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
      ],
      config: {
        wrapModule: {
          name: 'Models',
        },
      },
    },
    'libs/models/src/lib/queries.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
    'libs/models/src/lib/mutations.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
    'libs/models/src/introspection-result.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
