'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.prepare('Preparing ready.js');
exports.default = (client) =>
  client.on("ready", ()=>{
    client.user.setPresence({
      status: 'online',
      activity: {
        name: 'v!help for help.',
        type: 'STREAMING',
        url: 'https://twitch.tv/twitch',
      }
    });
    console.log(`Client ready, logged in as ${client.user.tag}:${client.user.id}`);
  })
;
