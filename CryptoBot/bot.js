require('dotenv').config()

const Telegraf  = require('telegraf');
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', ctx => {
    sendStartMessage(ctx);
  })
  
bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})


function sendStartMessage(ctx) {
    let startMessage = `Welcome, this bot gives you cryptocurrency information`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Crypto Prices", callback_data: 'price' }
            ],
            [
              { text: "CoinMarketCap", url: 'https://coinmarketcap.com/' }
            ],
            [
              { text: "Bot Info", callback_data: 'info' }
            ]
          ]
        }
      })
  }

bot.action('price', ctx => {
    let priceMessage = `Get Price Information. Select one of the cryptocurrencies below`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "BTC", callback_data: 'price-BTC' },
              { text: "ETH", callback_data: 'price-ETH' }
            ],
            [
              { text: "BCH", callback_data: 'price-BCH' },
              { text: "LTC", callback_data: 'price-LTC' }
            ],
            [
              { text: "Back to Menu", callback_data: 'start' },
            ],
          ]
        }
      })
  })

  
let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
bot.action(priceActionList, async ctx => {
let symbol = ctx.update.callback_query.data.split('-')[1];
//   console.log(symbol);

  try {
    let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${process.env.API_KEY}`)
    let data = res.data.DISPLAY[symbol].USD

    // console.log(data);

    let message =
      `
Symbol: ${symbol}
Price: ${data.PRICE}
Open: ${data.OPENDAY}
High: ${data.HIGHDAY}
Low: ${data.LOWDAY}
Supply: ${data.SUPPLY}
Market Cap: ${data.MKTCAP}
`;

    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Back to prices', callback_data: 'price' }
          ]
        ]
      }
    })

  } catch (err) {
    console.log(err);
    ctx.reply('Error Encountered');
  }

})

bot.action('info', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Bot Info", {
      reply_markup: {
        keyboard: [
          [
            { text: "Credits" },
            { text: "API" }
          ],
          [
            { text: "Remove Keyboard" },
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    })
  })

  bot.hears('Credits', ctx => {
    ctx.reply('This bot was made by @DagimAsnake');
  })
  
  bot.hears('API', ctx => {
    ctx.reply('This bot uses cryptocompare API');
  })

  bot.hears("Remove Keyboard", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Removed Keyboard",
      {
        reply_markup: {
          remove_keyboard: true
        }
      })
  })


bot.launch()