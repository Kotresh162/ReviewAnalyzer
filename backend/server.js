const express = require('express');
const scrapeReviews = require('./scrapeReviews');
const { getDataFromOpenAI } = require('./testApiKey'); // Importing the function
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Existing API Endpoint for scraping reviews
app.get('/api/reviews', async (req, res) => {
    const { page } = req.query;
    console.log(page);
    if (!page) {
        return res.status(400).json({ error: 'Page URL is required' });
    }

    try {
        const reviews = await scrapeReviews(page);
        res.json(reviews);
    } catch (error) {
        console.error('Error scraping reviews:', error.message);
        res.status(500).json({ error: 'Failed to retrieve reviews' });
    }
});

// New API Endpoint for OpenAI
app.post('/api/openai', getDataFromOpenAI); // Setting up the new endpoint

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

