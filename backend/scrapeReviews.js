const { chromium } = require('playwright');
const { getSelectors } = require('./llmhelper'); // Importing getSelectors

async function scrapeReviews(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();
    const selectors = await getSelectors(html);

    const reviews = [];
    const reviewItems = await page.$$(selectors.review_items);

    for (const item of reviewItems) {
        const title = await item.$eval(selectors.title, el => el.textContent.trim());
        const body = await item.$eval(selectors.body, el => el.textContent.trim());
        const rating = await item.$eval(selectors.rating, el => parseInt(el.textContent.trim()));
        const reviewer = await item.$eval(selectors.reviewer, el => el.textContent.trim());

        reviews.push({ title, body, rating, reviewer });
    }

    await browser.close();
    return { reviews_count: reviews.length, reviews };
}

module.exports = scrapeReviews;
