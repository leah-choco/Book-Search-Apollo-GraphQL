const { User, Book } = require("../models");
//Line 22 need help!
//Adding User and Book
const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    saveBook: async (parent, { _id, user }) => {
      const book = await Book.findOneAndUpdate(
        { _id },
        { $inc: { [`book${techNum}_votes`]: 1 } },
        { new: true }
      );
      return book;
    },
  },
};

module.exports = resolvers;
