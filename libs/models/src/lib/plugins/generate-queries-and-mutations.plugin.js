const fs = require('fs');
const path = require('path');
const { parse, print } = require('graphql');
const { deleteDirectory } = require('./delete-dir-plugin.js');

/**
 * Create a barrel file that exports all TS files in that barrel
 * @param {*} outputDir
 */
const createBarrelFile = (outputDir) => {
  const files = fs.readdirSync(outputDir);
  const exportStatements = files
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .map((file) => {
      const fileName = path.basename(file, '.ts');
      return `export * from './${fileName}';`;
    })
    .join('\n');

  fs.writeFileSync(path.join(outputDir, 'index.ts'), exportStatements);
};

module.exports = {
  plugin: async (schema, documents, config, info) => {
    // Update these paths to match your project structure
    const queriesDir = path.resolve(__dirname, '../temp/gqlg/queries');
    const mutationsDir = path.resolve(__dirname, '../temp/gqlg/mutations');
    const outputDir = path.resolve(__dirname, '../dist');

    const getGraphqlFilesContent = (dir) => {
      if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
      }

      return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.gql'))
        .map((file) => ({
          name: path.basename(file, path.extname(file)),
          content: fs.readFileSync(path.join(dir, file), 'utf8'),
        }))
        .map(({ name, content }) => ({
          name,
          ast: parse(content),
        }));
    };

    const queriesContent = getGraphqlFilesContent(queriesDir);
    const mutationsContent = getGraphqlFilesContent(mutationsDir);

    const printIndividualContent = (type, documents) => {
      return documents
        .map(({ name, ast }) => {
          return `export const ${name}${type} = gql\`${print(ast)};\``;
        })
        .join('\n');
    };

    const moduleWrapper = (output, moduleName) => {
      return `// DO NOT UPDATE THIS FILE, IT IS AUTOGENERATED
import { gql } from "apollo-angular" \n \n
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
export module ${moduleName} {
      ${output}
}`;
    };

    // Queries
    const queriesOutput = moduleWrapper(
      printIndividualContent('Query', queriesContent),
      'Queries'
    );

    // Mutations
    const mutationsOutput = moduleWrapper(
      printIndividualContent('Mutation', mutationsContent),
      'Mutations'
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'queries.graphql.ts'), queriesOutput);
    fs.writeFileSync(
      path.join(outputDir, 'mutations.graphql.ts'),
      mutationsOutput
    );

    // Create index.ts barrel file
    createBarrelFile(outputDir);

    // Delete the temp directory
    deleteDirectory('libs/models/src/lib/temp/');

    return '';
  },
};