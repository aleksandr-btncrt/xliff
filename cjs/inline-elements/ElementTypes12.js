"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ElementTypes = _interopRequireDefault(require("./ElementTypes.js"));
var _makeInlineElement = _interopRequireDefault(require("./makeInlineElement.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  elementTypeToTagMap: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ElementTypes.default.Standalone, 'x'), _ElementTypes.default.GenericSpan, 'g'), _ElementTypes.default.GenericSpanStart, 'bx'), _ElementTypes.default.GenericSpanEnd, 'ex'), _ElementTypes.default.Span, 'ph'), _ElementTypes.default.SpanStart, 'bpt'), _ElementTypes.default.SpanEnd, 'ept'), _ElementTypes.default.Marker, 'mrk'),
  tagToElementTypeMap: {
    x: _ElementTypes.default.Standalone,
    g: _ElementTypes.default.GenericSpan,
    bx: _ElementTypes.default.GenericSpanStart,
    ex: _ElementTypes.default.GenericSpanEnd,
    ph: _ElementTypes.default.Span,
    bpt: _ElementTypes.default.SpanStart,
    ept: _ElementTypes.default.SpanEnd,
    mrk: _ElementTypes.default.Marker
  },
  factories: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ElementTypes.default.Standalone, function (attributes) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.Standalone, attributes);
  }), _ElementTypes.default.GenericSpan, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.GenericSpan, attributes, contents);
  }), _ElementTypes.default.GenericSpanStart, function (attributes) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.GenericSpanStart, attributes);
  }), _ElementTypes.default.GenericSpanEnd, function (attributes) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.GenericSpanEnd, attributes);
  }), _ElementTypes.default.Span, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.Span, attributes, contents);
  }), _ElementTypes.default.SpanStart, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.SpanStart, attributes, contents);
  }), _ElementTypes.default.SpanEnd, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.SpanEnd, attributes, contents);
  }), _ElementTypes.default.Marker, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.Marker, attributes, contents);
  })
};
module.exports = exports.default;