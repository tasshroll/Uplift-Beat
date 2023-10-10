const connection = require('../server/config/connection');
const { News } = require('../server/models');
// require API.js
const fetchNews = require('../server/utils/API')

// const getRandomName = require('./data');

// console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
    // Delete the collections if they exist
    let newsCheck = await connection.db.listCollections({ name: 'news' }).toArray();
    if (newsCheck.length) {
        await connection.dropCollection('news');
    }

    const news = [];

    // fetch news
    // fetch new articles from API and store in News collection

    // Delete all existing news articles
    //News.findOneAndUpdate({}, { $set: { news: [] } });

    // Fetch new articles
    const articles = await fetchNews('education');

    // Find the existing News document or create a new one
    let newsDocument = await News.findOne();
    if (!newsDocument) {
        newsDocument = new News();
    }

    // Update the news array with the fetched articles
    newsDocument.news = articles;

    // Save the updated News document
    await newsDocument.save();
    await News.collection.insertMany(newsDocument);

    console.log('Inside seed.js News updated successfully!');


    process.exit(0);
});