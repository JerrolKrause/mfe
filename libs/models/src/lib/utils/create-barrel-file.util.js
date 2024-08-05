const fs = require('fs');
const path = require('path');

/**
 * Create a barrel file using the contents from that directory
 * @param {*} directoryPath
 */
const createBarrelFile = (directoryPath) => {
  const absolutePath = path.resolve(process.cwd(), directoryPath);
  const files = fs.readdirSync(absolutePath);
  const exportStatements = files
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .map((file) => {
      const fileName = path.basename(file, '.ts');
      return `export * from './${fileName}';`;
    })
    .join('\n');

  fs.writeFileSync(path.join(absolutePath, 'index.ts'), exportStatements);
  console.log(`Barrel file created at: ${path.join(absolutePath, 'index.ts')}`);
};
module.exports = createBarrelFile;
