import ElementTypes from './ElementTypes.js'
import makeInlineElement from './makeInlineElement.js'
import AttributesCheck from './AttributesCheck.js'

export default {
  elementTypeToTagMap: Object.freeze({
    [ElementTypes.CodePoint]: 'cp',
    [ElementTypes.Standalone]: 'ph',
    [ElementTypes.GenericSpan]: 'pc',
    [ElementTypes.GenericSpanStart]: 'sc',
    [ElementTypes.GenericSpanEnd]: 'ec',
    [ElementTypes.Span]: 'pc',
    [ElementTypes.SpanStart]: 'sc',
    [ElementTypes.SpanEnd]: 'ec',
    [ElementTypes.MarkedSpan]: 'mrk',
    [ElementTypes.MarkedSpanStart]: 'sm'
  }),
  tagToElementTypeMap:  Object.freeze({
    ph: ElementTypes.Standalone,
    pc: ElementTypes.Span,
    sc: ElementTypes.SpanStart,
    ec: ElementTypes.SpanEnd,
    cp: ElementTypes.CodePoint,
    mrk: ElementTypes.MarkedSpan,
    sm: ElementTypes.MarkedSpanStart
  }),
  factories:  Object.freeze({
    [ElementTypes.Standalone]: (attributes) => {
      const a = AttributesCheck[ElementTypes.Standalone](attributes, contents);
      return makeInlineElement(ElementTypes.Standalone, attributes)},
    [ElementTypes.GenericSpan]: (attributes, contents) => makeInlineElement(ElementTypes.GenericSpan, attributes, contents),
    [ElementTypes.GenericSpanStart]: (attributes) => makeInlineElement(ElementTypes.GenericSpanStart, attributes),
    [ElementTypes.GenericSpanEnd]: (attributes) => makeInlineElement(ElementTypes.GenericSpanEnd, attributes),
    [ElementTypes.Span]: (attributes, contents) => makeInlineElement(ElementTypes.Span, attributes, contents),
    [ElementTypes.SpanStart]: (attributes, contents) => makeInlineElement(ElementTypes.SpanStart, attributes, contents),
    [ElementTypes.SpanEnd]: (attributes, contents) => makeInlineElement(ElementTypes.SpanEnd, attributes, contents),
    [ElementTypes.CodePoint]: (attributes, contents) => {
      AttributesCheck[ElementTypes.CodePoint](attributes, contents)
      return makeInlineElement(ElementTypes.CodePoint, attributes, contents)
    },
    [ElementTypes.MarkedSpan]: (attributes, contents) => makeInlineElement(ElementTypes.MarkedSpan, attributes, contents),
    [ElementTypes.MarkedSpanStart]: (attributes, contents) => makeInlineElement(ElementTypes.MarkedSpanStart, attributes, contents)
  })
}
