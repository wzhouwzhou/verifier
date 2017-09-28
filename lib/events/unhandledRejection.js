'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
console.debug.prepare('Preparing unhandledRejection.js');
exports.default = () =>
  process.on('unhandledRejection', err =>
    console.debug.promiseError(err)
  )
;
