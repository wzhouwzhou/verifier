'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.build('Building invite.js');

exports.name = 'invite';

exports.exec = async (msg, {send}) =>
  await send('This is a private bot only for sinbad knights!')
;
