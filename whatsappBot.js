const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const {Configuration, OpenAIApi} = require("openai");

require('dotenv').config();

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log("Client is ready")
})

client.initialize()

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_TOKEN
})

const openai = new OpenAIApi(configuration)

async function runCompletion(message){
    const completion = await openai.createCompletion({
        model: 'ada',
        prompt: message, 
        max_tokens: 200,
        temperature: 0.5,
    })

    return completion.data.choices[0].text;
}

client.on('message', message => {
    console.log(message.body)
    runCompletion(message.body).then(result => message.reply(result))
})