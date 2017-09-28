'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.build('Building ping.js');

exports.name = 'ping';

exports.exec = async (msg, { send }) => {
  let now = Date.now();
  let sentmsg;
  try {
    sentmsg = await send("Pong! ");
  } catch (err) {
    console.debug.error(`Error at sending message of Ping: ${err}`);
    return send('Something went wrong…').catch(_=>_);
  }
  let sendMetrics = Date.now() - now;
  sentmsg.edit(`Pong! (${sendMetrics} ms)`);
};
