"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(str) {
  if (!str.match(/^[0-9A-Fa-f]+$/)) return false;
  return true;
}
module.exports = exports.default;