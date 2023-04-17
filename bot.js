const Telegram = require('node-telegram-bot-api')
const { Configuration, OpenAIApi} = require("openai")
require('dotenv').config()
//GptSandyBot
const botToken = process.env.TELEGRAM_BOT_TOKEN
const openApiToken = process.env.OPEN_API_TOKEN 

const config = new Configuration({
    apiKey: openApiToken,
})

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true }) 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to AI ChatBot")
})

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    
    const reply = await openai.createCompletion({
        max_tokens: 100,
        model: "ada",
        prompt: msg.text,
        temperature: 0.5,        
    });

    bot.sendMessage(chatId, reply.data.choices[0].text)
});

