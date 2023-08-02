const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id : ID
    username : String
    email : String
    articleCount : Int
    savedArticles : [Article]
    }

type Article {
    articleId : ID!
    description : String
    title : String
    image : String
    link : String
    }

type Query {
    me: User
    }
`;

module.exports = typeDefs;
