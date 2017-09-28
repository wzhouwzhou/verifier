'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.prepare('Preparing debug.js');
exports.default = (client) => {
  client.on("debug", console.debug.djsDebug);
};
