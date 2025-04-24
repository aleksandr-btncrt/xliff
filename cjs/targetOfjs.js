"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = targetOfjs;
var _ofjs = _interopRequireDefault(require("./ofjs.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function targetOfjs(js, cb) {
  return (0, _ofjs.default)(js, 'target', cb);
}
module.exports = exports.default;