const fs = require('fs');
const path = require('path');

module.exports = {
  plugin: async (schema, documents, config, info) => {
    const directoryToDelete = config.directoryToDelete;

    if (!directoryToDelete) {
      throw new Error('The directoryToDelete configuration is required.');
    }

    const absolutePath = path.resolve(process.cwd(), directoryToDelete);

    if (fs.existsSync(absolutePath)) {
      fs.rmSync(absolutePath, { recursive: true, force: true });
      console.log(`Directory deleted: ${absolutePath}`);
    } else {
      console.log(`Directory not found: ${absolutePath}`);
    }

    return '';
  },
};
