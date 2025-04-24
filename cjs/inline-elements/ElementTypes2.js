"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ElementTypes = _interopRequireDefault(require("./ElementTypes.js"));
var _makeInlineElement = _interopRequireDefault(require("./makeInlineElement.js"));
var _AttributesCheck = _interopRequireDefault(require("./AttributesCheck.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  elementTypeToTagMap: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ElementTypes.default.CodePoint, 'cp'), _ElementTypes.default.Standalone, 'ph'), _ElementTypes.default.GenericSpan, 'pc'), _ElementTypes.default.GenericSpanStart, 'sc'), _ElementTypes.default.GenericSpanEnd, 'ec'), _ElementTypes.default.Span, 'pc'), _ElementTypes.default.SpanStart, 'sc'), _ElementTypes.default.SpanEnd, 'ec'), _ElementTypes.default.MarkedSpan, 'mrk'), _ElementTypes.default.MarkedSpanStart, 'sm'),
  tagToElementTypeMap: {
    ph: _ElementTypes.default.Standalone,
    pc: _ElementTypes.default.Span,
    sc: _ElementTypes.default.SpanStart,
    ec: _ElementTypes.default.SpanEnd,
    cp: _ElementTypes.default.CodePoint,
    mrk: _ElementTypes.default.MarkedSpan,
    sm: _ElementTypes.default.MarkedSpanStart
  },
  factories: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ElementTypes.default.Standalone, function (attributes) {
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
  }), _ElementTypes.default.CodePoint, function (attributes, contents) {
    _AttributesCheck.default[_ElementTypes.default.CodePoint](attributes, contents);
    return (0, _makeInlineElement.default)(_ElementTypes.default.CodePoint, attributes, contents);
  }), _ElementTypes.default.MarkedSpan, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.MarkedSpan, attributes, contents);
  }), _ElementTypes.default.MarkedSpanStart, function (attributes, contents) {
    return (0, _makeInlineElement.default)(_ElementTypes.default.MarkedSpanStart, attributes, contents);
  })
};
module.exports = exports.default;