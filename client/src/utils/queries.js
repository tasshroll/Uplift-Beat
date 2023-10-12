import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedArticles {
        uniqueId
        description
        title
        image
        link
      }
    }
  }
  `;
  
  export const GET_NEWS = gql`
  query getNews {
    getNews {
      news {
        date
        description
        image
        link
        title
        uniqueId
      }
      newsCount
    }
  }
`;
