const fs = require('fs');
// eslint-disable-next-line @nx/enforce-module-boundaries
// import introspectionSchema from 'libs/models/src/lib/schema/introspection-result.json';

// const introspectionSchema = require('libs/models/src/lib/schema/introspection-result.json');

/**
 * Retrieves the default fields for a given type from the schema.
 *
 * @param {object} schema - The introspection schema object.
 * @param {string} typeName - The name of the type to retrieve fields for.
 * @returns {string} - A string containing the fields for the specified type.
 */
const getTypeFields = (schema, typeName) => {
  const type = schema.__schema.types.find((type) => type.name === typeName);
  if (!type || !type.fields) return '';

  return type.fields.map((field) => field.name).join('\n          ');
};

/**
 * Generates TypeScript files with GraphQL queries and mutations based on the introspection schema.
 *
 * @param {object} schema - The introspection schema object.
 * @param {string} outputPath - The path where the generated TypeScript files should be saved.
 *
 * @example
 * const schema = require('./libs/models/src/introspection-result.json');
 * generateQueriesAndMutations(schema, 'src/graphql');
 */
const generateQueriesAndMutations = (schema, outputPath) => {
  const queryType = schema.__schema.types.find((type) => type.name === 'Query');
  const mutationType = schema.__schema.types.find(
    (type) => type.name === 'Mutation'
  );

  const queries = queryType ? queryType.fields : [];
  const mutations = mutationType ? mutationType.fields : [];

  let queriesContent = `// DO NOT EDIT THIS FILE, IT IS AUTO-GENERATED
  import { gql } from 'apollo-angular';
  // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
  export module GraphQLQueries {`;
  queries.forEach((query) => {
    const fields = getTypeFields(schema, query.type.name);
    queriesContent += `export const ${query.name}Query = gql\`
      query ${query.name} {
        ${query.name} {
          ${fields}
        }
      }
    \`;\n\n`;
  });
  queriesContent += '}';

  let mutationsContent = `// DO NOT EDIT THIS FILE, IT IS AUTO-GENERATED
  import { gql } from 'apollo-angular';
  // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
  export module GraphQLMutations {`;

  mutations.forEach((mutation) => {
    const fields = getTypeFields(schema, mutation.type.name);
    mutationsContent += `export const ${mutation.name}Mutation = gql\`
      mutation ${mutation.name} {
        ${mutation.name} {
          ${fields}
        }
      }
    \`;\n\n`;
  });
  mutationsContent += '}';

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(`${outputPath}/queries.graphql.ts`, queriesContent);
  fs.writeFileSync(`${outputPath}/mutations.graphql.ts`, mutationsContent);
};

/**
 * Plugin function to generate TypeScript files for GraphQL queries and mutations.
 *
 * @param {object} schema - The GraphQL schema object.
 * @param {object[]} documents - The GraphQL documents.
 * @param {object} config - The plugin configuration.
 * @returns {string} - The content generated by the plugin.
 */
module.exports = {
  plugin: (schema, documents, config) => {
    generateQueriesAndMutations(config.schema, 'libs/models/src/lib/');
    return ''; // Return an empty string or any other content if needed
  },
};
