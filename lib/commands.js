'use strict';

const _ = require('lodash');

class Commands {
  constructor(config, helps) {
    this.config = config;
    this.cmds = {};
    this.helps = {};
    this.helpText = [];
    this.setCmds(config);
    this.setHelps(helps);
  }

  match(text) {
    if (this.cmds[text]) {
      return this.cmds[text];
    }
    return false;
  }

  setCmds(config) {
    _(config).forEach((vals, idx) => {
      vals.forEach((val) => {
        this.cmds[val] = idx;
      });
    });
  }

  setHelps(helps) {
    const helpTextArr = [];
    helpTextArr[0] = 'command : description';
    _(helps).forEach((vals, idx) => {
      helpTextArr.push(`[${this.config[idx].join(' , ')}] : ${vals}`);
    });

    this.helpText = helpTextArr.join('\n');
    process.HELP = this.helpText;
  }

  getHelpMsg() {
    return this.helpText;
  }
}

module.exports = Commands;
