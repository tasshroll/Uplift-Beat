const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

//const GOOGLE_NEWS_API_KEY = process.env.REACT_APP_GOOGLE_NEWS_API_KEY;
// const API_KEY = '83adf81aaa09ebebd6e2ced515d144b9';
const API_KEY = '2d32b3e7362ed426d927b84828553766';

// National News
async function fetchNews() {
  try {

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=nation&country=us&max=9`);

    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(), // Generate a unique ID for each article
      description: article.description,
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

// Entertainment News
async function fetchNews2() {
  try {

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=entertainment&country=us&max=9`);
    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(), // Generate a unique ID for each article
      description: article.description,
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

// Technology News
async function fetchNews3() {
  try {

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=technology&country=us&max=9`);

    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(), // Generate a unique ID for each article
      description: article.description,
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
export {fetchNews,fetchNews2,fetchNews3};

