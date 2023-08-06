const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables from .env file
// const NEWS_API_KEY = process.env.NEWS_API_KEY;

//const NEWS_API_KEY = '8895df928ce54f47a6f3704c59088f8d'; // Tifni's 1st key
// const NEWS_API_KEY = 'fa64ff879fa04ffbbc9c279324c2eb18'; // Tifni's 2nd key
const NEWS_API_KEY = 'b1677e5088e343cabbe699e7ac5f9ab1';
//const NEWS_API_KEY = '06cfcdbfc9a948d380fe714be6bdae2d'; // Tifni's 3rd key

async function fetchNews(offset) {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&technology=health&apiKey=${NEWS_API_KEY}&pageSize=20&page=${offset}`);
    const data = await response.json();
    console.log("data is ", data);
    // Extract the desired fields from the articles
    const articles = data.articles.map(article => ({
      articleId: uuidv4(), // Generate a unique ID for each article
      description: article.description,
      image: article.urlToImage,
      link: article.url,
      title: article.title,
    }));
    console.log("articles are ", articles);
    return articles;

  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default fetchNews;
