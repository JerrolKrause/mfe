import { gql } from 'apollo-angular';

export const album = gql`
  query album($id: ID!) {
    album(id: $id) {
      id
      photos(options: $options) {
        data {
          album
          id
          thumbnailUrl
          title
          url
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const albums = gql`
  query albums($options: PageQueryOptions) {
    albums(options: $options) {
      data {
        id
        photos(options: $options) {
          data
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options)
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
      links
      meta
    }
  }
`;

export const comment = gql`
  query comment($id: ID!) {
    comment(id: $id) {
      body
      email
      id
      name
      post {
        body
        comments(options: $options) {
          data {
            body
            email
            id
            name
            post
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        id
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
    }
  }
`;

export const comments = gql`
  query comments($options: PageQueryOptions) {
    comments(options: $options) {
      data {
        body
        email
        id
        name
        post {
          body
          comments(options: $options)
          id
          title
          user {
            address {
              city
              geo {
                lat
                lng
              }
              street
              suite
              zipcode
            }
            albums(options: $options) {
              data
              links {
                first {
                  limit
                  page
                }
                last
                next
                prev
              }
              meta {
                totalCount
              }
            }
            company {
              bs
              catchPhrase
              name
            }
            email
            id
            name
            phone
            posts(options: $options) {
              data
              links
              meta
            }
            todos(options: $options) {
              data
              links
              meta
            }
            username
            website
          }
        }
      }
      links
      meta
    }
  }
`;

export const photo = gql`
  query photo($id: ID!) {
    photo(id: $id) {
      album {
        id
        photos(options: $options) {
          data {
            album
            id
            thumbnailUrl
            title
            url
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
      id
      thumbnailUrl
      title
      url
    }
  }
`;

export const photos = gql`
  query photos($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        album {
          id
          photos(options: $options)
          title
          user {
            address {
              city
              geo {
                lat
                lng
              }
              street
              suite
              zipcode
            }
            albums(options: $options) {
              data
              links {
                first {
                  limit
                  page
                }
                last
                next
                prev
              }
              meta {
                totalCount
              }
            }
            company {
              bs
              catchPhrase
              name
            }
            email
            id
            name
            phone
            posts(options: $options) {
              data
              links
              meta
            }
            todos(options: $options) {
              data
              links
              meta
            }
            username
            website
          }
        }
        id
        thumbnailUrl
        title
        url
      }
      links
      meta
    }
  }
`;

export const post = gql`
  query post($id: ID!) {
    post(id: $id) {
      body
      comments(options: $options) {
        data {
          body
          email
          id
          name
          post
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const posts = gql`
  query posts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        body
        comments(options: $options) {
          data
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        id
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options)
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
      links
      meta
    }
  }
`;

export const todo = gql`
  query todo($id: ID!) {
    todo(id: $id) {
      completed
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data {
            id
            photos(options: $options) {
              data
              links {
                first {
                  limit
                  page
                }
                last
                next
                prev
              }
              meta {
                totalCount
              }
            }
            title
            user
          }
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const todos = gql`
  query todos($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        completed
        id
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links {
              first {
                limit
                page
              }
              last
              next
              prev
            }
            meta {
              totalCount
            }
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options)
          username
          website
        }
      }
      links
      meta
    }
  }
`;

export const user = gql`
  query user($id: ID!) {
    user(id: $id) {
      address {
        city
        geo {
          lat
          lng
        }
        street
        suite
        zipcode
      }
      albums(options: $options) {
        data {
          id
          photos(options: $options) {
            data
            links {
              first {
                limit
                page
              }
              last
              next
              prev
            }
            meta {
              totalCount
            }
          }
          title
          user
        }
        links
        meta
      }
      company {
        bs
        catchPhrase
        name
      }
      email
      id
      name
      phone
      posts(options: $options) {
        data
        links
        meta
      }
      todos(options: $options) {
        data
        links
        meta
      }
      username
      website
    }
  }
`;

export const users = gql`
  query users($options: PageQueryOptions) {
    users(options: $options) {
      data {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
      links
      meta
    }
  }
`;

export const createAlbum = gql`
  mutation createAlbum($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      photos(options: $options) {
        data {
          album
          id
          thumbnailUrl
          title
          url
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const createComment = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      body
      email
      id
      name
      post {
        body
        comments(options: $options) {
          data {
            body
            email
            id
            name
            post
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        id
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
    }
  }
`;

export const createPhoto = gql`
  mutation createPhoto($input: CreatePhotoInput!) {
    createPhoto(input: $input) {
      album {
        id
        photos(options: $options) {
          data {
            album
            id
            thumbnailUrl
            title
            url
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
      id
      thumbnailUrl
      title
      url
    }
  }
`;

export const createPost = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      body
      comments(options: $options) {
        data {
          body
          email
          id
          name
          post
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const createTodo = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      completed
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data {
            id
            photos(options: $options) {
              data
              links {
                first {
                  limit
                  page
                }
                last
                next
                prev
              }
              meta {
                totalCount
              }
            }
            title
            user
          }
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const createUser = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      address {
        city
        geo {
          lat
          lng
        }
        street
        suite
        zipcode
      }
      albums(options: $options) {
        data {
          id
          photos(options: $options) {
            data
            links {
              first {
                limit
                page
              }
              last
              next
              prev
            }
            meta {
              totalCount
            }
          }
          title
          user
        }
        links
        meta
      }
      company {
        bs
        catchPhrase
        name
      }
      email
      id
      name
      phone
      posts(options: $options) {
        data
        links
        meta
      }
      todos(options: $options) {
        data
        links
        meta
      }
      username
      website
    }
  }
`;

export const updateAlbum = gql`
  mutation updateAlbum($id: ID!, $input: UpdateAlbumInput!) {
    updateAlbum(id: $id, input: $input) {
      id
      photos(options: $options) {
        data {
          album
          id
          thumbnailUrl
          title
          url
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const updateComment = gql`
  mutation updateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      body
      email
      id
      name
      post {
        body
        comments(options: $options) {
          data {
            body
            email
            id
            name
            post
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        id
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
    }
  }
`;

export const updatePhoto = gql`
  mutation updatePhoto($id: ID!, $input: UpdatePhotoInput!) {
    updatePhoto(id: $id, input: $input) {
      album {
        id
        photos(options: $options) {
          data {
            album
            id
            thumbnailUrl
            title
            url
          }
          links {
            first {
              limit
              page
            }
            last
            next
            prev
          }
          meta {
            totalCount
          }
        }
        title
        user {
          address {
            city
            geo {
              lat
              lng
            }
            street
            suite
            zipcode
          }
          albums(options: $options) {
            data
            links
            meta
          }
          company {
            bs
            catchPhrase
            name
          }
          email
          id
          name
          phone
          posts(options: $options) {
            data
            links
            meta
          }
          todos(options: $options) {
            data
            links
            meta
          }
          username
          website
        }
      }
      id
      thumbnailUrl
      title
      url
    }
  }
`;

export const updatePost = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      body
      comments(options: $options) {
        data {
          body
          email
          id
          name
          post
        }
        links {
          first {
            limit
            page
          }
          last
          next
          prev
        }
        meta {
          totalCount
        }
      }
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const updateTodo = gql`
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      completed
      id
      title
      user {
        address {
          city
          geo {
            lat
            lng
          }
          street
          suite
          zipcode
        }
        albums(options: $options) {
          data {
            id
            photos(options: $options) {
              data
              links {
                first {
                  limit
                  page
                }
                last
                next
                prev
              }
              meta {
                totalCount
              }
            }
            title
            user
          }
          links
          meta
        }
        company {
          bs
          catchPhrase
          name
        }
        email
        id
        name
        phone
        posts(options: $options) {
          data
          links
          meta
        }
        todos(options: $options) {
          data
          links
          meta
        }
        username
        website
      }
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      address {
        city
        geo {
          lat
          lng
        }
        street
        suite
        zipcode
      }
      albums(options: $options) {
        data {
          id
          photos(options: $options) {
            data
            links {
              first {
                limit
                page
              }
              last
              next
              prev
            }
            meta {
              totalCount
            }
          }
          title
          user
        }
        links
        meta
      }
      company {
        bs
        catchPhrase
        name
      }
      email
      id
      name
      phone
      posts(options: $options) {
        data
        links
        meta
      }
      todos(options: $options) {
        data
        links
        meta
      }
      username
      website
    }
  }
`;
