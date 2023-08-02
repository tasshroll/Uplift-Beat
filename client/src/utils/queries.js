import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      articleCount
      savedArticles {
        articleId
        description
        title
        image
        link
      }
    }
  }
`;
