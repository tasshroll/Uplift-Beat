// Delete all news articles and seed them with new ones
const db = require('./connection');
const { News } = require('../models');

db.once('open', async () => {
  try {
    await News.deleteMany();

    const articles = await fetchNews('uplifting');
    console.log('articles are', articles);
    // save articles to database
    await News.insertMany(articles);
    console.log('News seeded successfully!');
    // error handling
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  console.log('News seeded');

  process.exit();
});