const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('savedBooks')
    }
  },

  // Mutation: {

  // },
};

module.exports = resolvers;
