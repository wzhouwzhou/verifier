'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = clean(text) {
  return typeof(text) === 'string'
  ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  : return text;
}
