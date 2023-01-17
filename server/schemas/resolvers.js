const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Need to get the server linked so I can test the work I do... 
    user: async (parent, { user }) => {
      return User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      })
    }
  },

  // Mutation: {

  // },
};

module.exports = resolvers;
