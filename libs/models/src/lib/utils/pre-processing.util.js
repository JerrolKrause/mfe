const deleteDirectory = require('./delete-directory.util');

/**
 * Perform actions before the generate action has been run
 */
const main = () => {
  deleteDirectory('libs/models/src/lib/dist'); // Remove dist dir
};

main();
