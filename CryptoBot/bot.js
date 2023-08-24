require('dotenv').config()

const { Telegraf } = require('telegraf');
const axios = require("axios")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command("test", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Main menu", 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "See list of fruits", callback_data: "fruits" },
                ],
                [
                    {text: "See list of meats", callback_data: "fruits" },
                ],
            ]
        }
    }
    )
})

bot.action("fruits" , ctx => {
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id, `List of fruits: \n-Banana\n-Apple\n-Orange`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Back to menu", callback_data: "back menu" },
                ],
            ]
        }
    }
    )
})

bot.action("back menu" , ctx => {
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id, "Main menu", 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "See list of fruits", callback_data: "fruits" },
                ],
                [
                    {text: "See list of meats", callback_data: "fruits" },
                ],
            ]
        }
    }
    )
})

bot.launch()