'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.prepare('Preparing guildMemberAdd.js');
const { ARStore, AR } = require('../struct/Antiraid');

exports.default = (client) => {
  client.on('guildMemberAdd',  async member => {
    const { guild, id: mid } = member;
    console.debug.antiraid(`New member ${member.user.tag} joined with id ${mid}`);
    const gid = guild.id;
    let newA;
    if(!ARStore.has(gid))
      newA = new AR(gid, client);
    if(newA) newA.enabled = true;
    AR.handleMember(member);
  });
};
