require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.start((ctx) => {
//     // ctx.reply("You have click Start command")
//     // console.log(ctx)
//     console.log(ctx.from)
//     console.log(ctx.chat)
//     console.log(ctx.message)
//     if (ctx.message.text) {
//         ctx.reply(ctx.from.first_name +" have click Start command and it is a Text " )
//         console.log('Text message');
//       }
// })

// bot.help((ctx) => {
//     ctx.reply("You have click Help command")
// })

// bot.settings((ctx) => {
//     ctx.reply("You have click Settings command")
// })

// bot.command(["test", "Test", "test1"], (ctx) => {
//     ctx.reply("Hello World")
// })

// bot.hears("cat" , (ctx) => {
//     ctx.reply("Meow")
// })

// bot.on("sticker", (ctx) => {
//     ctx.reply("This is sticker message")
// })

bot.use((ctx, next) => {
    ctx.state.apple = 5
    ctx.reply("You use the bot")
    next(ctx)
})

bot.start((ctx) => {
    // ctx.reply("You have click Start command")
    ctx.reply(String(ctx.state.apple))
})

bot.launch()