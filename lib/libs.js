'use strict';

const _ = require('lodash');

class Libs {

  pair(object, key, val) {
  
  }

  pairs (collections, key, val) {
    const r = {};
    collections.forEach((cv, ck) => {
      r[cv[key]] = cv[val];
    });
    return r;
  }

  lines (collections, pattern, keys) {
    const r = [];
    collections.forEach((cv) => {
      let line = pattern;
      keys.forEach((key) => {
        line = line.replace(`%${key}%`, cv[key]);
      });
      r.push(line);
    });
    return r.join('\n');
  }
}

module.exports = new Libs();
