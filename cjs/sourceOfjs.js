"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sourceOfjs;
var _ofjs = _interopRequireDefault(require("./ofjs.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function sourceOfjs(js, cb) {
  return (0, _ofjs.default)(js, 'source', cb);
}
module.exports = exports.default;