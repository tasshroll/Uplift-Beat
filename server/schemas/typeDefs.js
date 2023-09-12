const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id : ID
    username : String
    email : String
    articleCount : Int
    savedArticles : [Article]
    }
type News {
    _id : ID
    news : [Article]
    newsCount : Int
    }

type Article {
    uniqueId : String!
    description : String
    title : String
    image : String
    link : String
    date : String
    }

type Auth {
    token : ID
    user : User
    }

input ArticleInfo {
    description : String, 
    title : String, 
    uniqueId : String, 
    image: String, 
    link: String
    date: String
    }

type Query {
    me: User
    getNews : News
    }

type Mutation {
    login (email : String, password : String) : Auth
    addUser(username : String, email: String, password: String) : Auth
    saveArticle(articleData: ArticleInfo!): User
    removeArticle(articleId : String) : User
    }
`;

module.exports = typeDefs;
