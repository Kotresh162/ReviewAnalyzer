const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getSelectors(html) {
    const prompt = `
        Extract CSS selectors for the following HTML structure:
        1. Review items (container for each review)
        2. Title of the review
        3. Body text of the review
        4. Star rating of the review
        5. Reviewer name
        6. Pagination elements

        HTML: ${html}
    `;

    const requestBody = {
        model: "gpt-3.5-turbo", // Updated model
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0.7,
        store: true, // Retains the conversation for further context if needed.
    };

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const selectors = response.data.choices[0].message.content;
        return JSON.parse(selectors);
    } catch (error) {
        console.error("Error fetching OpenAI response:", error.message);
        throw error;
    }
}

module.exports = { getSelectors };
