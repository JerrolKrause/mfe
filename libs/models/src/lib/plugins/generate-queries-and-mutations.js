const gql = require('graphql-tag');

module.exports = {
  plugin: async (schema) => {
    const introspectionResult = schema.getTypeMap
      ? schema.getTypeMap()
      : schema._typeMap;
    const parsedSchema = introspectionResult;

    const generateFieldString = (field, processedTypes = new Set()) => {
      const { type } = field;
      let fieldStr = `${field.name}`;

      if (field.args.length) {
        const argsStr = field.args
          .map((arg) => `${arg.name}: $${arg.name}`)
          .join(', ');
        fieldStr += `(${argsStr})`;
      }

      const getFields = (type) => {
        if (type.ofType) {
          return getFields(type.ofType);
        }
        return type.getFields ? Object.values(type.getFields()) : null;
      };

      const fields = getFields(type);
      if (fields && fields.length > 0 && !processedTypes.has(type.name)) {
        processedTypes.add(type.name);
        const nestedFields = fields
          .map((nestedField) =>
            generateFieldString(nestedField, processedTypes)
          )
          .filter((nestedFieldStr) => nestedFieldStr) // filter out empty fields
          .join('\n');
        if (nestedFields) {
          fieldStr += ` {\n${nestedFields}\n}`;
        }
      } else if (type.ofType && type.ofType.kind === 'LIST') {
        const nestedType = type.ofType.ofType;
        const nestedFields = getFields(nestedType)
          .map((nestedField) =>
            generateFieldString(nestedField, processedTypes)
          )
          .filter((nestedFieldStr) => nestedFieldStr) // filter out empty fields
          .join('\n');
        if (nestedFields) {
          fieldStr += ` {\n${nestedFields}\n}`;
        }
      }

      return fieldStr;
    };

    const generateQueriesAndMutations = (parsedSchema) => {
      const queriesAndMutations = [];

      const queryType = parsedSchema['Query'];
      const mutationType = parsedSchema['Mutation'];

      if (!queryType || !queryType.getFields) {
        throw new Error('No query type found in the schema');
      }

      if (!mutationType || !mutationType.getFields) {
        throw new Error('No mutation type found in the schema');
      }

      const queryFields = Object.values(queryType.getFields());
      const mutationFields = Object.values(mutationType.getFields());

      const generateQueryOrMutation = (fields, type) => {
        fields.forEach((field) => {
          const argsStr = field.args.length
            ? `(${field.args
                .map((arg) => `$${arg.name}: ${arg.type}`)
                .join(', ')})`
            : '';

          const fieldStr = generateFieldString(field);

          if (fieldStr.includes('{')) {
            // include only if there are subfields
            const queryOrMutation = `export const ${field.name} = gql\`
${type.toLowerCase()} ${field.name}${argsStr} {
  ${fieldStr}
}
\`;
`;
            queriesAndMutations.push(queryOrMutation);
          }
        });
      };

      generateQueryOrMutation(queryFields, 'Query');
      generateQueryOrMutation(mutationFields, 'Mutation');

      return queriesAndMutations.join('\n');
    };

    const generatedCode = `
import { gql } from 'apollo-angular';

${generateQueriesAndMutations(parsedSchema)}
    `;

    return generatedCode;
  },
  validate: async (schema, documents, config, outputFile) => {
    if (!outputFile.endsWith('.ts') && !outputFile.endsWith('.tsx')) {
      throw new Error(
        `Plugin "generate-queries-and-mutations" requires extension to be ".ts" or ".tsx"!`
      );
    }
  },
};
