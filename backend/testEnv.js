require('dotenv').config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
setTimeout(() => {}, 10000); // Keeps the process alive for 10 seconds
