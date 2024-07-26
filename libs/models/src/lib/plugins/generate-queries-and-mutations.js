const fs = require('fs');
const introspectionSchema = require('../../introspection-result.json');

/**
 * Generates GraphQL queries and mutations based on the introspection schema and writes them to .graphql files.
 *
 * @param {object} schema - The introspection schema object.
 * @param {string} schemaPath - The path where the generated .graphql files should be saved.
 *
 * @example
 * const schema = require('../../introspection-result.json');
 * generateQueriesAndMutations(schema, 'libs/models/src/lib/queries.graphql');
 */
const generateQueriesAndMutations = (schema) => {
  const queries = schema.__schema.types.find(
    (type) => type.name === 'Query'
  ).fields;
  const mutations = schema.__schema.types.find(
    (type) => type.name === 'Mutation'
  ).fields;

  let queriesContent = '';
  queries.forEach((query) => {
    queriesContent += `query ${query.name} {\n  ${query.name} {\n    # Add fields here\n  }\n}\n\n`;
  });

  let mutationsContent = '';
  mutations.forEach((mutation) => {
    mutationsContent += `mutation ${mutation.name} {\n  ${mutation.name} {\n    # Add fields here\n  }\n}\n\n`;
  });

  fs.writeFileSync('libs/models/src/lib/queries.graphql', queriesContent);
  fs.writeFileSync('libs/models/src/lib/mutations.graphql', mutationsContent);
};

generateQueriesAndMutations(introspectionSchema);
