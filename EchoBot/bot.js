require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

const helpMessage = `
    Say something to me
    /start - Start the bot
    /help - Command reference
    /echo - "You said Echo"
    /echo <msg> - echo a message
`

bot.use((ctx, next) => {
    // console.log(ctx.chat)
    if(ctx.message.text) {
        bot.telegram.sendMessage(-935015227, ctx.from.username + " Said: " + ctx.message.text)
    } else {
        if(ctx.message.sticker) {
            bot.telegram.sendMessage(-935015227, ctx.from.username + " Said: " + 'Sent a sticker')
          } else if (ctx.message.photo) {
            bot.telegram.sendMessage(-935015227, ctx.from.username + " Said: " + 'Sent a photo')
          } else if (ctx.message.animation) {
            bot.telegram.sendMessage(-935015227, ctx.from.username + " Said: " + 'Sent an animation')
          }
    }
    next() 
})

bot.start((ctx) => {
    ctx.reply("Hi I am an Echo")
    ctx.reply(helpMessage)
})

bot.help((ctx) => {
    ctx.reply(helpMessage)
})

bot.command("echo", (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    // console.log(inputArray)
    let message = ""

    if(inputArray.length === 1){
        message = "You said Echo"
    } else {
        inputArray.shift()
        message = inputArray.join(" ")
    }

    ctx.reply(message)
})
    

bot.launch()