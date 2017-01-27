'use strict';

const AppRealm = require('./app-realm.js');

const key = 'StockCodes';
const realmKey = Symbol();

function StockCode (){
  this[realmKey] = new AppRealm(key);
}

StockCode.prototype.filter = function(filter) {
  return this[realmKey].get(key).filtered(filter);
}

StockCode.prototype.getCodes = function() {
  return this[realmKey].get(key);
}

StockCode.prototype.add = function(body) {
  this[realmKey].add(key, body);
}

module.exports = new StockCode();
// module.exports = StockCode;
