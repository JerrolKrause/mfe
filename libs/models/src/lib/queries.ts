import { gql } from 'apollo-angular';

export const _Query = gql`
      query _ {
        _ {
          
        }
      }
    `;

export const albumQuery = gql`
      query album {
        album {
          id
          photos
          title
          user
        }
      }
    `;

export const albumsQuery = gql`
      query albums {
        albums {
          data
          links
          meta
        }
      }
    `;

export const commentQuery = gql`
      query comment {
        comment {
          body
          email
          id
          name
          post
        }
      }
    `;

export const commentsQuery = gql`
      query comments {
        comments {
          data
          links
          meta
        }
      }
    `;

export const photoQuery = gql`
      query photo {
        photo {
          album
          id
          thumbnailUrl
          title
          url
        }
      }
    `;

export const photosQuery = gql`
      query photos {
        photos {
          data
          links
          meta
        }
      }
    `;

export const postQuery = gql`
      query post {
        post {
          body
          comments
          id
          title
          user
        }
      }
    `;

export const postsQuery = gql`
      query posts {
        posts {
          data
          links
          meta
        }
      }
    `;

export const todoQuery = gql`
      query todo {
        todo {
          completed
          id
          title
          user
        }
      }
    `;

export const todosQuery = gql`
      query todos {
        todos {
          data
          links
          meta
        }
      }
    `;

export const userQuery = gql`
      query user {
        user {
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

export const usersQuery = gql`
      query users {
        users {
          data
          links
          meta
        }
      }
    `;
