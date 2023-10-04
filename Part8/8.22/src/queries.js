import { gql } from '@apollo/client'


export const ME = gql`
query {
  me {
    favouriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        published
        author{
          name
        }
        genres
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!){
    allBooks(genre: $genre) {
      title
      published
      author{
        name
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{
        name
      }
      id
      published
      genres
    }
  }
`

export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }
`


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
