require('dotenv').config()

const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command(['start', 'help'], (ctx) => {
    let message = `
    Help References:
        /newyork - get image of New York
        /dubai - get gif of Dubai
        /singapore - get location of Singapore
        /cities- get photos of Cities
        /citiesList - get text file Cities
    `
    ctx.reply(message)
})

// bot.on("message", (ctx) => {
    // to get the file id
//     console.log(ctx.message.photo)
// })

bot.command("newyork", (ctx) => {
    // Url
    // bot.telegram.sendPhoto(ctx.chat.id, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4zhSM82aOyUCoJq2i3k27OYPNgu62NaGJg&usqp=CAU")
    
    // filepath
    // bot.telegram.sendPhoto(ctx.chat.id, {source: "importedFiles/dubai.jpg"})

    //file id
    // bot.telegram.sendPhoto(ctx.chat.id, 'AgACAgQAAxkBAAMKZOXqgJ-Ayu3GtOiQLCtAcKCV-xkAAku_MRv6aTBTbW-MZzBgCEkBAAMCAAN4AAMwBA' )

    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    bot.telegram.sendPhoto(ctx.chat.id, 
        {
            source: "importedFiles/newyork.jpg"
        },
        {
            reply_to_message_id: ctx.message.message_id
        }
    )
})

bot.command("dubai", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video")

    bot.telegram.sendAnimation(ctx.chat.id, 
        "https://media2.giphy.com/media/c0BdI069vyn5k/giphy.gif?cid=790b761140372d3186cd2314995cb37839375a907f0a0Be&rid=giphy.gif",
        {
            reply_to_message_id: ctx.message.message_id
        }
    )
})

bot.command("cities", (ctx) => {
    let cities = ["importedFiles/dubai.jpg", "importedFiles/hongkong.jpg", "importedFiles/london.jpg", "importedFiles/newyork.jpg", "importedFiles/singapore.jpg"]

    let result = cities.map(city => {
        return {
            type: "photo",
            media: {
                source: city
            }
        }
    })

    bot.telegram.sendMediaGroup(ctx.chat.id, result )
})

bot.command("citiesList", (ctx) => {
    bot.telegram.sendDocument(ctx.chat.id,
        {
            source: "importedFiles/citieslist.txt"
        },
        {
            thumb: {source: "importedFiles/dubai.jpg"}
        }
    )
})

bot.command("singapore", (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198)
})

bot.on("message", async(ctx) => {
    if(ctx.message.document) {
        try{
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id)
            ctx.reply("You download link " + link)
        } catch(err) {
            console.log(err)
            ctx.reply(err.description)
        }
    } else if(ctx.message.photo) {
        // console.log(ctx.message.photo[0].file_id)
        try{
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id)
            ctx.reply("You download link " + link)
        } catch(err) {
            console.log(err)
            ctx.reply(err.description)
        }
    }
})

bot.launch()