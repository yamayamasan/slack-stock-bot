'use strict';

const lang = require(`${process.env.APP_PATH}/config/lang.json`);

class Say {
  constructor() {
  
  }

  get(key) {
    const msg = lang[key];
    if (!msg) throw new Error('Not found key lang.json');

    return msg;
  }
}

module.exports = Say;
