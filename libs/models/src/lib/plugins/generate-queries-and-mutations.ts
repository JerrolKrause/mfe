import {
  PluginFunction,
  PluginValidateFn,
  Types,
} from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, printSchema } from 'graphql';

export type MyPluginConfig = any;

export const plugin: PluginFunction<MyPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: MyPluginConfig
) => {
  console.log('config', config);
  const schemaSDL = printSchema(config.schema);
  const parsedSchema = JSON.parse(schemaSDL);

  const generateQueriesAndMutations = (parsedSchema: any) => {
    const queriesAndMutations: any[] = [];

    const queryFields = parsedSchema.__schema.types.find(
      (type: any) => type.name === 'Query'
    ).fields;
    const mutationFields = parsedSchema.__schema.types.find(
      (type: any) => type.name === 'Mutation'
    ).fields;

    const generateFieldString = (field: any) => {
      let fieldStr = `${field.name}`;

      if (field.args.length) {
        const argsStr = field.args
          .map((arg: any) => `${arg.name}: $${arg.name}`)
          .join(', ');
        fieldStr += `(${argsStr})`;
      }

      if (field.type.kind === 'OBJECT') {
        const nestedFields = field.type.fields
          .map((nestedField: any) => nestedField.name)
          .join('\n');
        fieldStr += ` {\n${nestedFields}\n}`;
      }

      return fieldStr;
    };

    const generateQueryOrMutation = (fields: any[], type: string) => {
      fields.forEach((field: any) => {
        const argsStr = field.args.length
          ? `(${field.args
              .map((arg: any) => `$${arg.name}: ${arg.type.name}`)
              .join(', ')})`
          : '';

        const fieldStr = generateFieldString(field);

        const queryOrMutation = `export const ${field.name} = gql\`
${type.toLowerCase()} ${field.name}${argsStr} {
  ${fieldStr}
}
\`;
`;
        queriesAndMutations.push(queryOrMutation);
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
};

export const validate: PluginValidateFn<MyPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: MyPluginConfig,
  outputFile: string
) => {
  if (!outputFile.endsWith('.ts') && !outputFile.endsWith('.tsx')) {
    throw new Error(
      `Plugin "my-plugin" requires extension to be ".ts" or ".tsx"!`
    );
  }
};
