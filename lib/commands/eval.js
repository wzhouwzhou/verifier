'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.build('Building eval.js');

/* eslint no-unused-vars: "off" */
const util = require('util');
const _ = require('lodash');
const Constants = require('../dependencies/Constants');
exports.name = 'eval';

exports.exec = async (msg, {send, reply, channel, guild, suffix, content, args, prefix, author, member, client, bot, Discord }) => {
  if(!~Constants.ownerIDs.indexOf(author.id)) return;
  let result;
  try{
    result = eval(suffix);
    result&&result.constructor&&result.constructor.name === 'Promise'
    ? result.then(presult => send('eval:\n'+util.inspect(presult, {depth: 0})))
            .catch(err => send('error:\n'+err))
    : send('eval:\n'+util.inspect(result, {depth: 0})).catch(console.error);
  }catch(err){
    send('error:\n'+err).catch(console.error);
  }
  return true;
};
