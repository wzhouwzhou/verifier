'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.build('Building help.js');

exports.name = 'help';

exports.exec = async (msg, {send, Discord, client, member, prefix}) =>{
  let embed = new Discord.MessageEmbed();
  let myavatar = client.user.displayAvatarURL({format: 'png', size: 2048});
  embed.setColor(member&&member.displayColor?member.displayColor:1290103);
  embed.setAuthor(client.user.tag, myavatar);
  embed.setTitle('Commands').setDescription('Commands you can use :)');
  [
    ['ping',"Checks if I'm alive!"],
    ['mention','Do this command followed by a list of roles you want to mention, separated by commas'],
  ].map(e=>[prefix+e[0], e[1], e[2]]).forEach(f=>embed.addField(...f));

  embed.setFooter(`Serving ${client.users.size} unique users in ${client.guilds.size} server(s)`);
  return await send(embed);
};
