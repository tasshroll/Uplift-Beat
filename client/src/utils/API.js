const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

// async function fetchNews(offset) {
//   try {
//     const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&technology=health&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}&pageSize=20&page=${offset}`);
//     const data = await response.json();
//     console.log("data is ", data);
//     // Extract the desired fields from the articles
//     const articles = data.articles.map(article => ({
//       articleId: uuidv4(), // Generate a unique ID for each article
//       description: article.description,
//       image: article.urlToImage,
//       link: article.url,
//       title: article.title,
//     }));
//     console.log("articles are ", articles);
//     return articles;

//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return [];
//   }
// }


const GOOGLE_NEWS_API_KEY = '1739725f9b0f266db3eca565f23cc18b';

async function fetchNews(offset = 0) {
  try {
    // const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${process.env.REACT_APP_GOOGLE_NEWS_API_KEY}&country=us&offset=${offset}`);
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${GOOGLE_NEWS_API_KEY}&country=us&offset=${offset}`);

    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(), // Generate a unique ID for each article
      description: article.description,
      // image: article.urlToImage,
      image: article.image,

      link: article.url,
      title: article.title,
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}


// // const API_KEY = 'YOUR_CONTEXTUALWEB_API_KEY'; // Replace with your ContextualWeb API key

// // async function fetchNews() {
// //   try {
// //     const response = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=world&pageSize=10&pageNumber=1&autoCorrect=true&safeSearch=false`, {
// //       headers: {
// //         'X-RapidAPI-Key': API_KEY,
// //       },
// //     });

// //     const data = await response.json();

// //     const articles = data.value.map(article => ({
// //       articleId: uuidv4(), // Generate a unique ID for each article
// //       description: article.description,
// //       image: article.image.url || 'https://example.com/default-image.jpg', // Set a default image URL or handle missing image
// //       link: article.url,
// //       title: article.title,
// //     }));

// //     return articles;
// //   } catch (error) {
// //     console.error('Error fetching news:', error);
// //     return [];
// //   }
// // }

export default fetchNews;
