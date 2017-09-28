'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.build('Building say.js');
const _ = require('lodash');
exports.name = 'say';

exports.exec = async (msg, {guild, member, send, suffix, author}) => {
  if(author.id!=Constants.users.WILLY) return;
  if(!suffix || suffix === '') return send('You must give me a message to send!');
  if(!guild||member.hasPermission('BAN_MEMBERS'))
    return await send(_.escapeRegExp(suffix).substring(0,1800));
  if(!member.hasPermission('BAN_MEMBERS'))
    return await send('You must have permission to right-click ban members here to use this command');
};
