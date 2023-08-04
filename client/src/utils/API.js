const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables from .env file
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&technology=health&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    // Extract the desired fields from the articles
    const articles = data.articles.map(article => ({
      articleId: article.source.id || article.source.name,
      description: article.description,
      image: article.urlToImage,
      link: article.url,
      title: article.title,
    }));

    return articles;

  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Error fetching news');
  }
}

module.exports = fetchNews;