'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

console.debug.prepare('Preparing edit.js');

exports.default = (client, prefix, msgStats) => {
  const theprefix = client.prefix||prefix;
  client.on('messageUpdate', (om, nm)=>{
    if(nm.content === om.content) return;
    /*msgStats.lastTime = msgStats.currentTime||Date.now();
    msgStats.currentTime = Date.now();
    const time = msgStats.currentTime-msgStats.lastTime;
    msgStats.IRate = 1/(time>0?(time/1000):1);*/
    msgStats.count++;
    if(nm.author.bot)return;

    if(nm.content.substring(0,theprefix.length)!==theprefix) return false;//console.log('nothing');
    client.CommandHandler.handle(nm, theprefix);
  });
};
