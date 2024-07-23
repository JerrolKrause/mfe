// custom-plugin.ts
import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { concatAST, Kind } from 'graphql';

export const modifyOutput: PluginFunction = async (
  schema,
  documents,
  config
): Promise<string> => {
  const allAst = concatAST((documents as any).map((v: any) => v.document));
  const content = allAst.definitions
    .map((def) => {
      if (def.kind === Kind.OBJECT_TYPE_DEFINITION) {
        return `export type ${def.name.value} = any;`;
      }
      return '';
    })
    .join('\n');

  const wrappedContent = `export module LoanProducts {\n${content}\n}`;
  return wrappedContent;
};

export default plugin;
