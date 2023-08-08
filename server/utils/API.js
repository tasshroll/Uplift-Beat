// const fetch = require('node-fetch');
// const { v4: uuidv4 } = require('uuid');

// const GOOGLE_NEWS_API_KEY = process.env.GOOGLE_NEWS_API_KEY;
// // const API_KEY = '1739725f9b0f266db3eca565f23cc18b';

// exports.fetchNews =  async function fetchNews() {
//   try {
//     // const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=us&offset=${offset}`);
//     const url = `https://gnews.io/api/v4/top-headlines?token=${GOOGLE_NEWS_API_KEY}&country=us`
//     console.log(url)
//     const response = await fetch(url);

//     // const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${process.env.REACT_APP_GOOGLE_NEWS_API_KEY}&country=us&offset=${offset}`);
//     const data = await response.json();

//     console.log(data)

//     const articles = data.articles.map(article => ({
//       articleId: uuidv4(), // Generate a unique ID for each article
//       description: article.description,
//       // image: article.urlToImage,
//       image: article.image,

//       link: article.url,
//       title: article.title,
//     }));

//     return articles;
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return [];
//   }
// }

// async function fetchNews2() {
//   try {
//     // const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=us&offset=${offset}`);

//     const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=entertainment&country=us`);

//     // const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${process.env.REACT_APP_GOOGLE_NEWS_API_KEY}&country=us&offset=${offset}`);

//     const data = await response.json();

//     const articles = data.articles.map(article => ({
//       articleId: uuidv4(), // Generate a unique ID for each article
//       description: article.description,
//       // image: article.urlToImage,
//       image: article.image,

//       link: article.url,
//       title: article.title,
//     }));

//     return articles;
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return [];
//   }
// }



