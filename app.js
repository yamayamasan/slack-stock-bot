'use strict';
process.env.APP_PATH = __dirname;
process.env.DB_PATH  = `${__dirname}/database`;

const config = require('./config/slack.json');

const onMessage = require('./ctrl/onMessage');

const Botkit = require('botkit');
const bot = Botkit.slackbot({
  debug: false,
});
bot.spawn({
  token: config.token
}).startRTM();

bot.hears('', ['direct_message'], onMessage);
