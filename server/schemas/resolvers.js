const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, News } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // get News from the News collection even if user is not logged in  
        getNews: async () => {
            try {
                console.log('***** getting news from Mongo DB'  );
                // News holds a variable news which is an array of articles
                const newsDoc = await News.findOne();
                
                //console.log('news in DB is', newsDoc);
                return newsDoc;
            } catch (error) {
                console.error('Error fetching news:', error);
                return [];
            }
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this userame found!');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user }
        },

        saveArticle: async (parent, { articleData }, context) => {
            //console.log('In resolver - articleData saving to User model', articleData)
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
            console.log('In resolver - uniqueId removing from User model', articleId)
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    // remove the article based on its unique ID
                    { $pull: { savedArticles: { uniqueId : articleId } } },
                    { new: true }
                );
                console.log('updatedUser after remove of article is', updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },
};

module.exports = resolvers;
