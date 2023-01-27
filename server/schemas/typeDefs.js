const { gql } = require('apollo-server-express');

const typeDefs = gql`
input BookData {
  authors: [String]!
  description: String!
  title: String!
  bookId: String!
  image: String
  link: String
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  # Need to define type Book in order for this to work
  savedBooks: [Book]!
}

type Book {
  _id: ID
  bookId: String
  authors: [String]!
  description: String
  title: String
  image: String
  link: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(book: BookData): User
  removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
