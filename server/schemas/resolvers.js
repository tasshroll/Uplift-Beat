const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this userame found!');
            }
            // isCorrectPassword is a method defined in the User model
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
        // args represents the params and the req.body of the query
        // args holds the username, email, and password of the user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user }
        },

        saveArticle: async (parent, { articleData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet:
                            { savedArticles: articleData }
                    },
                    { new: true }
                );
                return updatedUser;
        
            }
            throw new AuthenticationError('You need to be logged in!');

        },
        removeArticle: async (parent, { articleId }, context) => {
            if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedArticles: { articleId } } },
                { new: true }
            );
            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
