const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  # Need to define type Book in order for this to work
  savedBooks: [Book]
}

type Book {
  _id: ID
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

type Query {
  user(email: String!): User
}

# type Mutation {
# 
# }


`;

module.exports = typeDefs;
