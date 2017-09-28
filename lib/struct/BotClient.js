'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const fs = require('fs');

exports.default = (Discord, _, path) => {
  const CommandHandler = require('./CommandHandler').default;
  const Command = require('./Command').default;
  return class BotClient extends Discord.Client{
    constructor(options){
      super(options);
      this.eventPath = path.join(__dirname,'../../',options.eventPath);
      this.cmdPath = path.join(__dirname,'../../',options.cmdPath);
      this.prefix = options.prefix||'>';
      this.msgStats = options.msgStats;
    }

    build () {
      this.CommandHandler = new CommandHandler(this,_,Discord);
      if(this.eventPath) fs.readdirSync(this.eventPath).forEach( event => {
        if(!/\.js$/.test(event)) return;
        require(`${this.eventPath}/${event}`).default(this, this.prefix, this.msgStats);
        delete require.cache[require.resolve(`${this.eventPath}/${event}`)];
        console.debug.load('Loaded event '+event);
      });
      if(this.cmdPath) fs.readdirSync(this.cmdPath).forEach( cmd => {
        if(!/\.js$/.test(cmd)) return;
        const cmda = new Command(require(`${this.cmdPath}/${cmd}`));
        delete require.cache[require.resolve(`${this.cmdPath}/${cmd}`)];
        this.CommandHandler.cmds.set(cmda.name.toLowerCase(), cmda);
        console.debug.load(`Loaded command #${this.CommandHandler.cmds.size}: ${cmd}`);
      });
      return this;
    }
  };
};
