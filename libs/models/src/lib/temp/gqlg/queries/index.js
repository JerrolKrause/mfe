const fs = require('fs');
const path = require('path');

module.exports._ = fs.readFileSync(path.join(__dirname, '_.gql'), 'utf8');
module.exports.album = fs.readFileSync(
  path.join(__dirname, 'album.gql'),
  'utf8'
);
module.exports.albums = fs.readFileSync(
  path.join(__dirname, 'albums.gql'),
  'utf8'
);
module.exports.comment = fs.readFileSync(
  path.join(__dirname, 'comment.gql'),
  'utf8'
);
module.exports.comments = fs.readFileSync(
  path.join(__dirname, 'comments.gql'),
  'utf8'
);
module.exports.photo = fs.readFileSync(
  path.join(__dirname, 'photo.gql'),
  'utf8'
);
module.exports.photos = fs.readFileSync(
  path.join(__dirname, 'photos.gql'),
  'utf8'
);
module.exports.post = fs.readFileSync(path.join(__dirname, 'post.gql'), 'utf8');
module.exports.posts = fs.readFileSync(
  path.join(__dirname, 'posts.gql'),
  'utf8'
);
module.exports.todo = fs.readFileSync(path.join(__dirname, 'todo.gql'), 'utf8');
module.exports.todos = fs.readFileSync(
  path.join(__dirname, 'todos.gql'),
  'utf8'
);
module.exports.user = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');
module.exports.users = fs.readFileSync(
  path.join(__dirname, 'users.gql'),
  'utf8'
);
