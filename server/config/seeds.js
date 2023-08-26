const db = require('./connection');
const { News } = require('../models');

db.once('open', async () => {
  await News.deleteMany();

  const articles = await fetchNews('uplifting');
        console.log('articles', articles);
        // save articles to database
        await News.insertMany(articles);
        console.log('News seeded successfully!');
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    console.log('News seeded');

  process.exit();
});