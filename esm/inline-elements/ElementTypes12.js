function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ElementTypes from './ElementTypes.js';
import makeInlineElement from './makeInlineElement.js';
export default {
  elementTypeToTagMap: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ElementTypes.Standalone, 'x'), ElementTypes.GenericSpan, 'g'), ElementTypes.GenericSpanStart, 'bx'), ElementTypes.GenericSpanEnd, 'ex'), ElementTypes.Span, 'ph'), ElementTypes.SpanStart, 'bpt'), ElementTypes.SpanEnd, 'ept'), ElementTypes.Marker, 'mrk'),
  tagToElementTypeMap: {
    x: ElementTypes.Standalone,
    g: ElementTypes.GenericSpan,
    bx: ElementTypes.GenericSpanStart,
    ex: ElementTypes.GenericSpanEnd,
    ph: ElementTypes.Span,
    bpt: ElementTypes.SpanStart,
    ept: ElementTypes.SpanEnd,
    mrk: ElementTypes.Marker
  },
  factories: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ElementTypes.Standalone, function (attributes) {
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
  }), ElementTypes.Marker, function (attributes, contents) {
    return makeInlineElement(ElementTypes.Marker, attributes, contents);
  })
};