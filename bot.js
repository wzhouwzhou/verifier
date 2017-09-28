
/* eslint linebreak-style: "off" */
const _ = require('lodash');
const Discord = require("discord.js");
const path = require('path');
const chalk = require('chalk');
chalk.enabled = true;
const moment = require('moment');

const Constants = require('./lib/dependencies/Constants');
const Credentials = require('./lib/dependencies/credentials.json');

const debugL = ((...args) => console.log(chalk.bgBlue('[Debug]'),...[' ',...args]));
const debugManager = {
  get: (target, prop) => {
    return ((...args) => console.log(chalk.bgBlue('[Debug]'),...[' ', chalk.cyan(`[${(prop[0].toUpperCase())+(prop[1]?prop.substring(1):'')}] `),...args]));
  }
};
console.debug = new Proxy(debugL, debugManager);

console.log(chalk.green.bgBlue.underline.bold(`${'\n'.repeat(20)}\n${Constants.name} is booting up! Please wait.\n`));
const msgStats = {
  count: 0,
  maxIR: 0.1,
};
const GUI = new (require('./lib/struct/GUI').default)(Constants.name, process.env.TOKEN||Credentials.token, _, msgStats).build();

const client = new (require('./lib/struct/BotClient').default(Discord, _, path))({
  'eventPath': './lib/events',
  'cmdPath': './lib/commands',
  'prefix': Constants.PREFIX||'>',
  msgStats,
  fetchAllMembers: true,

});

client.GUI = GUI;
const oL = console.log;
console.log = (...args) => oL.apply({}, [chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] | `),...args.map(e=>typeof e === 'string'?e.replace(/\[ws\]/g, chalk.bgBlue('[ws]')):e)]);
console.error = (...args) => console.debug.error(...args);
client.build().login(process.env.TOKEN||Credentials.token);
