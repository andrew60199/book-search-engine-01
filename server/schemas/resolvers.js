const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Need to get the server linked so I can test the work I do... 
    // Need to console.log these arguments to understand they they work
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({
          $or: [{ _id: context.user._id }, { username: context.username }],
        }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      // We are getting the book back here
      // console.log(book)
      // However we are not getting the content and therefore it isn't working
      console.log(`Context.user = ${context.user}`)
      console.log(`Context._id = ${context._id}`)
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        )
      }
    }
  }
};

module.exports = resolvers;
