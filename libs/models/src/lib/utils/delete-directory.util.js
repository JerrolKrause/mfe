const fs = require('fs');
const path = require('path');

/**
 * Delete a directory
 * @param {*} directoryPath
 */
const deleteDirectory = (directoryPath) => {
  const absolutePath = path.resolve(process.cwd(), directoryPath);
  if (fs.existsSync(absolutePath)) {
    fs.rmSync(absolutePath, { recursive: true, force: true });
    console.log(`Directory deleted: ${absolutePath}`);
  } else {
    console.log(`Directory not found: ${absolutePath}`);
  }
};

module.exports = deleteDirectory;
