'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const EventEmitter = require('events');
const blessed = require('blessed');

exports.default = class GUI extends EventEmitter {
  constructor(name, TOKEN, _, msgCounter){
    super();
    this.msgCounter = msgCounter;
    this.TOKEN = TOKEN;
    this._ = _;
    this.name = name;
    this.screen = blessed.screen({ smartCSR: !0, fullUnicode: !0 });
    this.screen.title = this.name||'Bot';
    this.viewport = blessed.box({
      label: 'Console (press q, esc, or Control-C to exit)',
      width: '85%',
      left: '8%',
      height:'100%',
      border: { type: 'line' },
      keys: true,
      vi: true,
      mouse: true,
      keyboard: true,
    });

    //msgs/second
    this.progress3 = blessed.ProgressBar({
      parent: this.screen,
      top: 0,
      height: '100%',
      width: '7%',
      left: 0,
      orientation: 'vertical',
      border: { type: 'line' },
      pch: '░',
      style: {
        bg: 'green',
      },
    });

    this.consolebox = blessed.log({
      parent: this.viewport,
      tags: true,
      scrollable: true,
      label: '',
      alwaysScroll: true,
      scrollbar: {
        ch: '',
        inverse: true,
      },
      content: this.name+' {bold}GUI and Logging Ready!{/bold}!',
      style: {
        bg: 301
      },
      keys: true,
      vi: true,
      mouse: true,
      keyboard: true,
    });
    this.screen.key('q', function() {
      return this.screen.destroy();
    });

    //cpu
    this.progress2 = blessed.ProgressBar({
      parent: this.screen,
      top: 0,
      height: '50%',
      width: '7%',
      right: 0,
      orientation: 'vertical',
      border: { type: 'line' },
      pch: '▓',
      style: {
        bg: 'red',
      },
    });

    //ram
    this.progress = blessed.ProgressBar({
      parent: this.screen,
      bottom: 0,
      height: '50%',
      width: '7%',
      right: 0,
      orientation: 'vertical',
      border: { type: 'line' },
      pch: '░',
      style: {
        bg: 'blue',
      },
    });

  }

  build(){
    this.screen.append(this.progress3);
    this.screen.append(this.viewport);
    this.screen.append(this.progress);
    this.screen.append(this.progress2);
    this.screen.key(['escape', 'q', 'C-c'], () =>
      process.exit(0)
    );

    this.oldlog = console.log;
    console.log = (...args) => this.log(args);

    this.consolebox.focus();
    this.render();
    return this;
  }

  render(){
    this.screen.render();
    this.viewport.focus();
    this.consolebox.focus();
    //this.progress.setProgress(69);
    if(this.interval) clearInterval(this.interval);
    this.interval = null;

    this.interval = setInterval(()=>{
      this.r = (process.memoryUsage().heapUsed / 1024 / 1024);
      this.progress.setLabel(`RAM(MB): ${this.r}`);
      this.progress.setProgress(100*this.r/(process.memoryUsage().heapTotal / 1024 / 1024));

      this.c = require('os').loadavg()[0];
      this.progress2.setLabel(`CPU(%): ${this.c}`);
      this.progress2.setProgress(this.c);

      /*this.rate=this.msgCounter.count/process.uptime();
      if(this.rate>this.msgCounter.maxR) this.msgCounter.maxR = this.rate;

      this.progress3.setLabel(`Msgs/s: ${this.rate}`);
      this.progress3.setProgress(100*this.rate/this.msgCounter.maxR);
      */
      this.screen.render();
    }, 50);

    if(this.interval2) clearInterval(this.interval2);
    this.interval2 = null;
    this.interval2 = setInterval(()=>{
      this.rate = this.msgCounter.count||0;
      if(this.maxCount==null) this.maxCount = 1;
      if(this.rate>this.maxCount) this.maxCount = this.rate+0.5;
      this.msgCounter.count = 0;

      this.progress3.setLabel(`Msgs/s: ${this.rate||0}`);
      this.progress3.setProgress(100*this.rate/this.maxCount||0);
      this.screen.render();
    },1000);


    return this;
  }

  log(args){
    this.consolebox.log(args.join('').replace(new RegExp(`${this._.escapeRegExp(this.TOKEN)}`,'gi'),'[REDACTED TOKEN]'));
  }
};
/*

  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#2469FF'
    },
    hover: {
      bg: 'green'
    },
  },*/


//const oldLog = console.log;
/*
console.log = (...args) => {
  box.insertBottom(args.join(''));
  screen.render();
};

const progress = blessed.ProgressBar({
  top: 'center',
  height: '10',
  width: '100%',
  orientation: 'horizontal',
  pch: '░',
});

// Append our box to the screen.
screen.append(box);
screen.append(progress);
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
progress.focus();
box.focus();

screen.render();
*/
