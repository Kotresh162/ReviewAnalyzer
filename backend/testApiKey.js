const { Configuration, OpenAIApi } = require("openai");

console.log("Configuration:", Configuration); // Log the Configuration for debugging

const config = new Configuration({
    apiKey:"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" ,
});
const openai = new OpenAIApi(config);
const runprompt = async () =>{
    const prompt = "tell me a joke about pasta";
    const respond = await openai.createCompletion({
        module:"text-davinci-003",
        prompt:prompt,
        max_token:2048,
        temperature:1,
    })
    console.log(respond);
}

runprompt();
