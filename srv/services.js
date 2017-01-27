'use strict';

const _  = require('lodash');
const co = require('co');

const scraping = require('./scraping.js');

const detail = 'http://stocks.finance.yahoo.co.jp/stocks/detail/?code=';
// const search = 'http://info.finance.yahoo.co.jp/search/?query=';
const fx = 'http://info.finance.yahoo.co.jp/fx/';

const convert = {
  "米ドル/円": "USD/JPY",
  "ユーロ/円": "EUR/JPY",
  "豪ドル/円": "AUD/JPY",
}
const Services = {};

Services.getData = (code) => {
  return new Promise((resolve) => {
    co(function *(){
      const r = yield scraping.get(detail + code, parse.detail);
      resolve(r);
    });
  });
};

Services.getFxData = () => {
  return new Promise((resolve) => {
    co(function *(){
      console.log('fx');
      const r = yield scraping.get(fx, parse.fx);
      resolve(r);
    });
  }).catch((e) => {
    console.log(e);
  });
};

/*
Services.search = (word) => {
  return new Promise((resolve) => {
    co(function *(){
      const r = yield scraping.get(search + word, parse.search);
      console.log(r);
    });
  });
};
*/

Services.getDatas = (codes) => {
  const pros = [];

  return new Promise((resolve) => {
    _.each(codes, (v) => {
      const p = new Promise((resolve) => {
        co(function *(){
          const data = yield Services.getData(v.code);
          resolve(data);
        });
      });
      pros.push(p);
    });
    Promise.all(pros).then((datas) => {
      resolve(datas);
    });
  });
};

const parse = {
  detail: ($) => {
    const name = $('th.symbol > h1').text();
    const stoksPrice = $($('td.stoksPrice')[1]).text();

    const change = [];

    const cng = 'td.change > span';
    $(cng).each((i, v) => {
      const cl = v.attribs.class.split(' ')[0];
      const c = $(`${cng}.${cl}`).text();
      change.push(c);
    });

    return {
      name, stoksPrice,
      cng_st: change[0],
      cng_vl: change[1]
    };
  },
  fx: ($) => {
    const tr = $('table.topMainRate > tr');
    const th = $(tr[0]).find('th');

    const datas = [];
    th.each((i, v) => {
      let name = $(v).find('em').text();
      if (convert[name]) name = convert[name];
      let stoksPrice = _fmtFxPrice($(v).find('span').text());
      const state = getState(name, stoksPrice);
      datas.push({
        name, stoksPrice, state
      });
    });
    return datas;
  }
};

function _fmtFxPrice(org) {
  return (org + '0000').slice(0, 7);
}

const fxstate = {};
function getState (name, price) {
  let r = '';
  if (!fxstate[name]) fxstate[name] = null;
  // if (fxstate[name] != null && fxstate[name] < price) r = '⇓';
  if (fxstate[name] != null && fxstate[name] < price) r = ':arrow_upper_right:';
  // if (fxstate[name] != null && fxstate[name] > price) r = '⇑';
  if (fxstate[name] != null && fxstate[name] > price) r = ':arrow_lower_right:';
  fxstate[name] = price;
  return r;
}

module.exports = Services;
