'use strict';

const Commands = require('../lib/commands');
const Ctrl = require('./message');
// const ctrl = new Ctrl();
const commands = new Commands(require('../config/commands.json'), require('../config/help.json'));

module.exports = function (bot, data){
  if (data.type !== 'message') return false;

  const fncName = commands.match(data.text);
  if (!fncName) return false;
  const fnc = Ctrl[fncName];
  if (typeof fnc == 'function') {
    fnc.call({}, bot, data);
  }
};

