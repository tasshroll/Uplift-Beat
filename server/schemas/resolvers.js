const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

// the resolvers are responsible for providing the implementation for the queries and mutations 
// defined in the schema (typeDefs). They back the typeDefs
// context is passed to all resolvers and will share authentication data across all resolvers
const resolvers = {
    Query: {
        // args represents the params and the req.body of the query
        // context contains the username, email, and _id of the logged in user
        me: async (parent, args, context) => {
            // check if context.user exists. If it exists, then the user is authenticated
            // then we can use the context.user
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
