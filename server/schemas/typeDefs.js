const { gql } = require('apollo-server-express');

// these typeDefs match the mongo models in ./models
// these are the objects that are returned when a user makes a query
// ArticleInfo is used to pass data into our saveArticle mutation

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

type Auth {
    token : ID
    user : User
    }

input ArticleInfo {
    description : String, 
    title : String, 
    articleId : String, 
    image: String, 
    link: String
    }

type Query {
    me: User
    }

type Mutation {
    login (email : String, password : String) : Auth
    addUser(username : String, email: String, password: String) : Auth
    saveArticle(articleData: ArticleInfo!): User
    removeArticle(articleId : ID) : User
    }
`;

module.exports = typeDefs;
