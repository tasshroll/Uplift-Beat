const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('insertKeyHere');

const router = require('express').Router();

async function fetchNews() {
  try {
    const response = await newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    });
    return response;
  } catch (error) {
    console.error('Error fetching news sources:', error);
    return { status: 'error', message: 'Failed to fetch news sources' };
  }
}

router.get('/technology-news-sources', async (req, res) => {
  const newsSources = await fetchNews();
  res.json(newsSources);
});

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

module.exports = router;
