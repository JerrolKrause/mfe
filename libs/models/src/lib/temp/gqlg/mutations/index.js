const fs = require('fs');
const path = require('path');

module.exports._ = fs.readFileSync(path.join(__dirname, '_.gql'), 'utf8');
module.exports.createAlbum = fs.readFileSync(
  path.join(__dirname, 'createAlbum.gql'),
  'utf8'
);
module.exports.createComment = fs.readFileSync(
  path.join(__dirname, 'createComment.gql'),
  'utf8'
);
module.exports.createPhoto = fs.readFileSync(
  path.join(__dirname, 'createPhoto.gql'),
  'utf8'
);
module.exports.createPost = fs.readFileSync(
  path.join(__dirname, 'createPost.gql'),
  'utf8'
);
module.exports.createTodo = fs.readFileSync(
  path.join(__dirname, 'createTodo.gql'),
  'utf8'
);
module.exports.createUser = fs.readFileSync(
  path.join(__dirname, 'createUser.gql'),
  'utf8'
);
module.exports.deleteAlbum = fs.readFileSync(
  path.join(__dirname, 'deleteAlbum.gql'),
  'utf8'
);
module.exports.deleteComment = fs.readFileSync(
  path.join(__dirname, 'deleteComment.gql'),
  'utf8'
);
module.exports.deletePhoto = fs.readFileSync(
  path.join(__dirname, 'deletePhoto.gql'),
  'utf8'
);
module.exports.deletePost = fs.readFileSync(
  path.join(__dirname, 'deletePost.gql'),
  'utf8'
);
module.exports.deleteTodo = fs.readFileSync(
  path.join(__dirname, 'deleteTodo.gql'),
  'utf8'
);
module.exports.deleteUser = fs.readFileSync(
  path.join(__dirname, 'deleteUser.gql'),
  'utf8'
);
module.exports.updateAlbum = fs.readFileSync(
  path.join(__dirname, 'updateAlbum.gql'),
  'utf8'
);
module.exports.updateComment = fs.readFileSync(
  path.join(__dirname, 'updateComment.gql'),
  'utf8'
);
module.exports.updatePhoto = fs.readFileSync(
  path.join(__dirname, 'updatePhoto.gql'),
  'utf8'
);
module.exports.updatePost = fs.readFileSync(
  path.join(__dirname, 'updatePost.gql'),
  'utf8'
);
module.exports.updateTodo = fs.readFileSync(
  path.join(__dirname, 'updateTodo.gql'),
  'utf8'
);
module.exports.updateUser = fs.readFileSync(
  path.join(__dirname, 'updateUser.gql'),
  'utf8'
);
