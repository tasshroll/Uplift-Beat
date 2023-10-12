import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_ARTICLE = gql`
  mutation saveArticle($articleData: ArticleInfo!) {
    saveArticle(articleData: $articleData) {
      _id
      username
      email
      articleCount
      savedArticles {
        uniqueId
        description
        title
        image
        link
        date
      }
    }
  }
`;


export const REMOVE_ARTICLE = gql`
  mutation removeArticle($articleId: String!) {
    removeArticle(articleId: $articleId) {
      _id
      username
      email
      savedArticles {
        uniqueId
        description
        title
        image
        link
        date
      }
    }
  }
`;
