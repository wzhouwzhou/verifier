'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = class Command {
  constructor(props){
    Object.entries(props).map( ([k, v]) => this[k] = v);
  }
};
