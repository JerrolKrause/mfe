const fs = require('fs');
const introspectionSchema = require('../../introspection-result.json');

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

  let queriesContent = "import { gql } from 'apollo-angular';\n\n";
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

  let mutationsContent = "import { gql } from 'apollo-angular';\n\n";
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

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(`${outputPath}/queries.ts`, queriesContent);
  fs.writeFileSync(`${outputPath}/mutations.ts`, mutationsContent);
};

/**
 * Main function to generate TypeScript files for GraphQL queries and mutations.
 */
const main = () => {
  generateQueriesAndMutations(introspectionSchema, 'libs/models/src/lib/');
};

main();
