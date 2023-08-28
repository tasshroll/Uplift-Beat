const connection = require('../config/connection');

const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

//const GOOGLE_NEWS_API_KEY = process.env.REACT_APP_GOOGLE_NEWS_API_KEY;

// Use these 3 API keys to rotate through them to avoid hitting the rate limit of 100 calls/day
const API_KEY = '83adf81aaa09ebebd6e2ced515d144b9';
//const API_KEY = '2d32b3e7362ed426d927b84828553766'; // Mubarek's API key
//const API_KEY =  '1739725f9b0f266db3eca565f23cc18b'; // Tif key 1
//const API_KEY = 'b2836ccdc750cd6d94b3cb47a1460ce3'; // Tif key 2

const { News } = require('../models');


// Function to delete old news articles
async function deleteOldNews() {
    try {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 1); // Set threshold to one day ago

        // Delete articles with 'date' field older than the threshold date
        const deleteResult = await News.updateMany(
            { 'news.date': { $lt: thresholdDate.toISOString() } },
            { $pull: { news: { date: { $lt: thresholdDate.toISOString() } } } }
        );

        console.log(`Deleted ${deleteResult.nModified} old news articles.`);
    } catch (error) {
        console.error('Error deleting old news articles:', error);
    }
}

// Schedule the deletion process to run daily
setInterval(deleteOldNews, 24 * 60 * 60 * 1000); // Run every 24 hours (adjust as needed)


async function fetchNews(query) {
    try {

        const response = await fetch(`https://gnews.io/api/v4/search?q=${query}%20news&from=${currentDate}&to=${currentDate}&lang=en&token=${API_KEY}&max=9`);
        const data = await response.json();
        console.log("data", data);
        const articles = data.articles.map(article => ({
            uniqueId: article.url,
            description: article.description,
            image: article.image,
            link: article.url,
            title: article.title,
            date: article.publishedAt,
        }));
        console.log("articles are", articles);

        return articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// fetch new articles from API and store in News collection
async function seedNews() {

    try {
        // Delete the collections if they exist
        //await News.deleteMany({});
        // Delete all existing news articles
        await News.findOneAndUpdate({}, { $set: { news: [] } });

        // Fetch new articles
        const articles = await fetchNews('technology');

        // Find the existing News document or create a new one
        let newsDocument = await News.findOne();
        if (!newsDocument) {
            newsDocument = new News();
        }
        console.log("newsDocument", newsDocument);

        // Update the news array with the fetched articles
        newsDocument.news = articles;

        // Save the updated News document
        await newsDocument.save();

        console.log('News updated successfully!');
    } catch (error) {
        console.error('Error updating news:', error);
    }
}

module.exports = {seedNews};