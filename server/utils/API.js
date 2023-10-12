const connection = require('../config/connection');

const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
// import .env file

// four keys are in .env file that are for the GNews API
require('dotenv').config();
const API_KEY = process.env.API_KEY;

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

// 10 articles per fetch, 1 req per sec, 100 req per day
async function fetchNews(query) {
    try {
        const upliftKeywords = ['uplift', 'motivate', 'encouraging', 'promising', 'happy', 'good', 'bright', 'hopeful', 'good news', 'welcome', 'positive', 'charity', 'faith', 'love', 'kindness', 'charity'];
        //'charity', 'positive', 'reaffirm', 'love', 'kindness', 'virtue', 'charity', 'compassion', 'empathy', 'sympathy', 'benevolence', 'altruism', 'humanity'];
        
        const fullQuery = query + ' AND (' + upliftKeywords.join(' OR ') + ')';

        const response = await fetch(`https://gnews.io/api/v4/search?q=${fullQuery}%20news&from=${currentDate}&to=${currentDate}&lang=en&token=${API_KEY}&max=9`);
        const data = await response.json();
        //console.log("data", data);
        const articles = data.articles.map(article => ({
            uniqueId: article.url,
            description: article.description,
            image: article.image,
            link: article.url,
            title: article.title,
            date: article.publishedAt,
        }));

        return articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// fetch new articles from API and store in News collection
async function seedNews() {
    const queries = ['technology', 'education', 'health', 'entertainment', 'nation'];
    //'world', 'sports', 'business', 'science'];
    try {
        // Delete all existing news articles
        await News.findOneAndUpdate({}, { $set: { news: [] } });

        let articles = [];
        for (let i = 0; i < queries.length; i++) {
            const news = await fetchNews(queries[i]);
            articles = articles.concat(news); // add the articles to the array
            // Wait for 1 sec since API has a rate limit of 1 request per second
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Find the existing News document or create a new one
        let newsDocument = await News.findOne();
        if (!newsDocument) {
            newsDocument = new News();
        }

        // Update the news array with the fetched articles
        newsDocument.news = articles;

        // Save the updated News document
        await newsDocument.save();
        //console.log('News in DB updated successfully!');
        
    } catch (error) {
        console.error('Error updating news:', error);
    }
}

module.exports = { seedNews };