'use strict';

const client = require('cheerio-httpcli');

const Scraping = {};

Scraping.get = (url, parse) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, (err, $) => {
      if (err) reject(err);

      const datas = parse($);
      resolve(datas);
    });
  });
};

module.exports = Scraping;
