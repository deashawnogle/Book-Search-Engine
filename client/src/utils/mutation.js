import {gql} from "@apollo/client"

export const ADD_USER = gql`
mutation addUser($username:String!, $email: String!, $password: String! ){
    addUser(username: $username, email: $email, password: $password) {
      token
      user{
        email
      }
    }
  }`;

  export const LOGIN_USER = gql `
  mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }`;

  export const SAVE_BOOK =gql `
  mutation saveBook($book: savedBook!) {
    saveBook(book: $book){
      email 
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }`

  export const REMOVE_BOOK =gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId:$bookId){
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }`