function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ElementTypes from './ElementTypes.js';
import makeInlineElement from './makeInlineElement.js';
import AttributesCheck from './AttributesCheck.js';
export default {
  elementTypeToTagMap: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ElementTypes.CodePoint, 'cp'), ElementTypes.Standalone, 'ph'), ElementTypes.GenericSpan, 'pc'), ElementTypes.GenericSpanStart, 'sc'), ElementTypes.GenericSpanEnd, 'ec'), ElementTypes.Span, 'pc'), ElementTypes.SpanStart, 'sc'), ElementTypes.SpanEnd, 'ec'), ElementTypes.MarkedSpan, 'mrk'), ElementTypes.MarkedSpanStart, 'sm'),
  tagToElementTypeMap: {
    ph: ElementTypes.Standalone,
    pc: ElementTypes.Span,
    sc: ElementTypes.SpanStart,
    ec: ElementTypes.SpanEnd,
    cp: ElementTypes.CodePoint,
    mrk: ElementTypes.MarkedSpan,
    sm: ElementTypes.MarkedSpanStart
  },
  factories: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ElementTypes.Standalone, function (attributes) {
    return makeInlineElement(ElementTypes.Standalone, attributes);
  }), ElementTypes.GenericSpan, function (attributes, contents) {
    return makeInlineElement(ElementTypes.GenericSpan, attributes, contents);
  }), ElementTypes.GenericSpanStart, function (attributes) {
    return makeInlineElement(ElementTypes.GenericSpanStart, attributes);
  }), ElementTypes.GenericSpanEnd, function (attributes) {
    return makeInlineElement(ElementTypes.GenericSpanEnd, attributes);
  }), ElementTypes.Span, function (attributes, contents) {
    return makeInlineElement(ElementTypes.Span, attributes, contents);
  }), ElementTypes.SpanStart, function (attributes, contents) {
    return makeInlineElement(ElementTypes.SpanStart, attributes, contents);
  }), ElementTypes.SpanEnd, function (attributes, contents) {
    return makeInlineElement(ElementTypes.SpanEnd, attributes, contents);
  }), ElementTypes.CodePoint, function (attributes, contents) {
    AttributesCheck[ElementTypes.CodePoint](attributes, contents);
    return makeInlineElement(ElementTypes.CodePoint, attributes, contents);
  }), ElementTypes.MarkedSpan, function (attributes, contents) {
    return makeInlineElement(ElementTypes.MarkedSpan, attributes, contents);
  }), ElementTypes.MarkedSpanStart, function (attributes, contents) {
    return makeInlineElement(ElementTypes.MarkedSpanStart, attributes, contents);
  })
};