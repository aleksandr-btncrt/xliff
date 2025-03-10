import { elementTypeToTag } from '../inline-elements/typeToTagMaps.js'

/**
 * Creates an XML element object
 * @param {string} name - The element name/tag
 * @param {Object} [attributes] - Element attributes
 * @param {Array} [elements] - Child elements
 * @returns {{
 *  type: 'element',
 *  name: string,
 *  attributes?: Object,
 *  elements?: Array
 * }}
 */
export function makeElement(name, attributes, elements) {
  const el = {
    type: 'element',
    name
  }
  if (attributes !== null && attributes !== undefined) {
    el.attributes = attributes
  }
  if (Array.isArray(elements)) {
    el.elements = elements
  } else if (elements === true) {
    el.elements = []
  }
  return el
}

/**
 * Creates a text node object
 * @param {string} text - The text content
 * @returns {{
 *  type: 'text',
 *  text: string}}
 */
export function makeText(text) {
  return {
    type: 'text',
    text
  }
}

/**
 * Creates XML elements from content
 * @param {string|Object|Array} content - Content to convert to XML elements
 * @param {Object} elementTypeInfo - Element type configuration
 * @returns {Array<{type: 'text', type: string} | {type: 'element', name: string, attributes?: Object, elements?: Array<*>} | {type: 'comment',  comment: string} }>}
 */
export function makeValue(content, elementTypeInfo) {
  if (!Array.isArray(content)) {
    if (typeof content === 'string' || content instanceof String) {
      return [makeText(content)]
    }
    // for single object
    const elementType = Object.keys(content)[0]
    const elementTag = elementTypeToTag(elementType, elementTypeInfo)

    if (elementTag !== undefined) {
      const attrsSrc = Object.assign({}, content[elementType])
      delete attrsSrc.id
      delete attrsSrc.contents
      // eslint-disable-next-line no-prototype-builtins
      const contents = content[elementType].hasOwnProperty('contents') ? makeValue(content[elementType].contents, elementTypeInfo) : undefined
      const attrs = {
        id: content[elementType].id
      }
      Object.keys(attrsSrc).forEach((attrKey) => {
        attrs[attrKey] = attrsSrc[attrKey]
      })
      return [makeElement(elementTag, attrs, contents)]
    }

    return [makeText(content)]
  }

  return content.map((segment) => {
    if (typeof segment === 'string' || segment instanceof String) {
      return makeText(segment)
    }
    // Inline elements
    // Each inline element object should only have one property (key) -- the element type
    const elementType = Object.keys(segment)[0]
    const elementTag = elementTypeToTag(elementType, elementTypeInfo)
    if (elementTag !== undefined) {
      const attrsSrc = Object.assign({}, segment[elementType])
      delete attrsSrc.id
      delete attrsSrc.contents
      // eslint-disable-next-line no-prototype-builtins
      const contents = segment[elementType].hasOwnProperty('contents') ? makeValue(segment[elementType].contents, elementTypeInfo) : undefined
      const attrs = {
        id: segment[elementType].id
      }
      Object.keys(attrsSrc).forEach((attrKey) => {
        attrs[attrKey] = attrsSrc[attrKey]
      })
      return makeElement(elementTag, attrs, contents)
    }
    // If an invalid object is included as a segment in a source/target value array,
    // just turn it into an XML comment
    const segmentString =
      '{ ' +
      Object.keys(segment).reduce((result, segmentKey) => {
        return result + segmentKey + ': "' + segment[segmentKey].toString() + '"'
      }, '') +
      ' }'
    return { type: 'comment', comment: 'Warning: unexpected segment ' + segmentString + ' was ignored' }
  })
}
