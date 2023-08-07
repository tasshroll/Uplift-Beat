const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

async function fetchNews(offset) {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&technology=health&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}&pageSize=20&page=${offset}`);
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
