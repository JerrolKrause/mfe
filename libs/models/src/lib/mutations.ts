import { gql } from 'apollo-angular';

export const _Mutation = gql`
      mutation _ {
        _ {
          
        }
      }
    `;

export const createAlbumMutation = gql`
      mutation createAlbum {
        createAlbum {
          id
          photos
          title
          user
        }
      }
    `;

export const createCommentMutation = gql`
      mutation createComment {
        createComment {
          body
          email
          id
          name
          post
        }
      }
    `;

export const createPhotoMutation = gql`
      mutation createPhoto {
        createPhoto {
          album
          id
          thumbnailUrl
          title
          url
        }
      }
    `;

export const createPostMutation = gql`
      mutation createPost {
        createPost {
          body
          comments
          id
          title
          user
        }
      }
    `;

export const createTodoMutation = gql`
      mutation createTodo {
        createTodo {
          completed
          id
          title
          user
        }
      }
    `;

export const createUserMutation = gql`
      mutation createUser {
        createUser {
          address
          albums
          company
          email
          id
          name
          phone
          posts
          todos
          username
          website
        }
      }
    `;

export const deleteAlbumMutation = gql`
      mutation deleteAlbum {
        deleteAlbum {
          
        }
      }
    `;

export const deleteCommentMutation = gql`
      mutation deleteComment {
        deleteComment {
          
        }
      }
    `;

export const deletePhotoMutation = gql`
      mutation deletePhoto {
        deletePhoto {
          
        }
      }
    `;

export const deletePostMutation = gql`
      mutation deletePost {
        deletePost {
          
        }
      }
    `;

export const deleteTodoMutation = gql`
      mutation deleteTodo {
        deleteTodo {
          
        }
      }
    `;

export const deleteUserMutation = gql`
      mutation deleteUser {
        deleteUser {
          
        }
      }
    `;

export const updateAlbumMutation = gql`
      mutation updateAlbum {
        updateAlbum {
          id
          photos
          title
          user
        }
      }
    `;

export const updateCommentMutation = gql`
      mutation updateComment {
        updateComment {
          body
          email
          id
          name
          post
        }
      }
    `;

export const updatePhotoMutation = gql`
      mutation updatePhoto {
        updatePhoto {
          album
          id
          thumbnailUrl
          title
          url
        }
      }
    `;

export const updatePostMutation = gql`
      mutation updatePost {
        updatePost {
          body
          comments
          id
          title
          user
        }
      }
    `;

export const updateTodoMutation = gql`
      mutation updateTodo {
        updateTodo {
          completed
          id
          title
          user
        }
      }
    `;

export const updateUserMutation = gql`
      mutation updateUser {
        updateUser {
          address
          albums
          company
          email
          id
          name
          phone
          posts
          todos
          username
          website
        }
      }
    `;
