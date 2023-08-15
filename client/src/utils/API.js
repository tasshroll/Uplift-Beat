const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

//const GOOGLE_NEWS_API_KEY = process.env.REACT_APP_GOOGLE_NEWS_API_KEY;

// Use these 3 API keys to rotate through them to avoid hitting the rate limit of 100 calls/day
// const API_KEY = '83adf81aaa09ebebd6e2ced515d144b9';
 const API_KEY = '2d32b3e7362ed426d927b84828553766'; // Mubarek's API key
// const API_KEY =  '1739725f9b0f266db3eca565f23cc18b'; // Tif key 1
//const API_KEY = 'b2836ccdc750cd6d94b3cb47a1460ce3'; // Tif key 2


async function fetchNews() {
  try {

    //const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=nation&country=us&max=9`);
    const response = await fetch(`https://gnews.io/api/v4/search?q=funny%20news&token=${API_KEY}`);

    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(),
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

async function fetchNews2() {
  try {

    //const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=entertainment&country=us&max=9`);
    const response = await fetch(`https://gnews.io/api/v4/search?q=funny%20news&token=${API_KEY}`);
    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(),
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

async function fetchNews3() {
  try {

    //const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&topic=technology&country=us&max=9`);
    const response = await fetch(`https://gnews.io/api/v4/search?q=uplifting%20news&token=${API_KEY}`);

    const data = await response.json();

    const articles = data.articles.map(article => ({
      articleId: uuidv4(),
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
export { fetchNews, fetchNews2, fetchNews3 };

