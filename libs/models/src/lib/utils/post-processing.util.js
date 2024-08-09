const deleteDirectory = require('./delete-directory.util');
const createBarrelFile = require('./create-barrel-file.util');

/**
 * Perform actions after the generate action has been run
 */
const main = () => {
  deleteDirectory('libs/models/src/lib/temp'); // Remove temp dir
  createBarrelFile('libs/models/src/lib/dist'); // Create barrel file for dist directory
};

main();
