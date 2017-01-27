'use strict';

const _ = require('lodash');
const co = require('co');
const service = require('../srv/services');
const StockCode = require('../model/stockcode');
const LibSay = require('../lib/say');
const libsay = new LibSay();
const Libs = require('../lib/libs');

class Message {

  constructor() {
  }

  help(bot, data) {
    bot.reply(data, process.HELP);
  }

  hi(bot, data) {
    console.log(data);
  }

  tag_create(bot, data) {
    const codes = StockCode.getCodes();
    const pairs = Libs.pairs(codes, 'code', 'name');
    const list = Libs.lines(codes, "%code% : %name%", ['code', 'name']);

    let tagName = '';
    const qStart = (res, convo) => {
      convo.ask('input tag name', (res, convo) => {
        tagName = res.text;
        convo.say(`OK, ${tagName}`);
        convo.say(list);
        qTagName(res, convo);
        convo.next();
      });
    };
    const qTagName = (res, convo) => {
      convo.ask('input code from list(or exit)', (res, convo) => {
        const code = res.text;
        if (code == 'exit') 
        const codeData = pairs[code];
        if (codeData) {
        
        } else {
        
        }
        console.log(code);
      });
    };
    bot.startConversation(data, qStart);
  }

  current(bot, data) {
    const qStart = (res, convo) => {
      convo.ask('input stock code', (res, convo) => {
        const text = res.text;
        co(function* (){
          convo.say(libsay.get('procsearch'));
          const data = yield service.getData(res.text);
          const ret = `${data.name} : ${data.stoksPrice}`;

          convo.say(ret);
          convo.next();
        });
      });
    };
    bot.startConversation(data, qStart);
  }

  timer(bot, data) {
    const qStart = (res, convo) => {
      convo.ask('input code or all', (res, convo) => {
        const text = res.text;
        if (text == 'all') {
        }
        co(function* (){
          convo.say(libsay.get('procsearch'));
          const data = yield service.getData(res.text);
          console.log(data);
        });
      });
    };
    bot.startConversation(data, qStart);
  }

  search(bot, data) {
    const qStart = (res, convo) => {
      convo.ask('input stock code', (res, convo) => {
        co(function* (){
          convo.say(libsay.get('procsearch'));
          const data = yield service.getData(res.text);
          console.log(data);
        });
      });
    };
    bot.startConversation(data, qStart);
  }

  save(bot, data) {
    const qStart = (res, convo) => {
      convo.ask('input stockcode', (res, convo) => {
        co(function *() {
          const data = StockCode.filter(`code == '${res.text}'`);
          let msg = libsay.get('already');
          if (_.isEmpty(data)) {
            const data = yield service.getData(res.text);
            if (!_.isEmpty(data.name)) {
              StockCode.add({
                'name': data.name,
                'code': res.text
              });
            }
            msg = (data.name)? `${libsay.get('success')} : ${data.name}` : libsay.get('not');
          }
          convo.say(msg);
          convo.next();
        }).catch((e) => {
          console.log(e);
        });
      });
    };

    bot.startConversation(data, qStart);
  }

  list(bot, data) {
    const codes = StockCode.getCodes();
    const list = Libs.lines(codes, "%code% : %name%", ['code', 'name']);
    bot.reply(data, list));
  }
}

module.exports = new Message();
