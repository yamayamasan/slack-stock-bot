'use strict';

const AppRealm = require('./app-realm.js');

const key = 'StockCodes';
const realmKey = Symbol();

class StockCode {
  constructor() {
    this[realmKey] = new AppRealm(key);
  }

  getCodes() {
    return this[realmKey].get(key);
  }

  add(body) {
    this[realmKey].add(key, {'body': body});
  }
}

module.exports = new StockCode();
