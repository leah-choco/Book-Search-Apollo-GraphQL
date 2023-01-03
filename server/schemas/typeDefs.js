const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: ??(This will be an array of the Book type.)
  }

  type Book {
    bookId: ID!
    authors: ??(An array of strings, as there may be more than one author)
    description: String!
    title: String
    image: ????
    link: String????
  }

  type Query {
    me: [User]
    user(userId: ID!): User
  }

  type Mutation {
   login:??? Accepts an email and password as parameters; returns an Auth type
   addUser(Accepts a username, email, and password as parameters; returns an Auth type)
   saveBook(book authors array, description, title, bookId,image, and link as parameters, look into input type)
   removeBook(bookId) : User
  }
`;
//Auth type: token, user( References the User type.)

module.exports = typeDefs;
