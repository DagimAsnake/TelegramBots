require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

const helpMessage = `
    Say something to me
    /start - Start the bot
    /help - Command reference
`

bot.start((ctx) => {
    ctx.reply("Hi I am an Echo")
    ctx.reply(helpMessage)
})

bot.help((ctx) => {
    ctx.reply(helpMessage)
})

bot.launch()