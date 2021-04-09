import { Telegraf } from 'telegraf'
import {InstagramService} from "./services/instagram.service";

// Use .env file for variables
require('dotenv').config()

// Instantiate a new Bot
const bot = new Telegraf(process.env.TELEGRAM_API_KEY || '')

// Listen the /start command
bot.command('start',(ctx) => { ctx.reply('Hello, I\'m your Instagram client!') })

// Listen the /feed command
bot.command('feed', async (ctx) => {
    const userTimeline = await InstagramService.getUserTimeline()
    userTimeline.forEach(item => {
        ctx.replyWithPhoto({ url: item.image }, { caption: `${item.username}: ${item.caption}`})
    })
})

// Launch Bot
bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))