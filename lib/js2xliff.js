import convert from 'xml-js'
import ElementTypes2 from './inline-elements/ElementTypes2.js'
import { makeElement, makeText, makeValue } from './xml-js/objectToXml.js'

import escape from './util/escape.js'

/**
 * Converts JavaScript object to XLIFF format (callback version)
 * @param {Object} obj - The source object to convert
 * @param {string} obj.sourceLanguage - Source language code
 * @param {string} obj.targetLanguage - Target language code
 * @param {Object} obj.resources - Translation resources
 * @param {Object} [opt] - Options for conversion
 * @param {string} [opt.indent='  '] - Indentation string
 * @param {Function} [cb] - Optional callback function
 * @returns {string} XLIFF formatted XML string
 */
const js2xliffClb = (obj, opt, cb) => {
  if (!cb && typeof opt === 'function') {
    cb = opt
    opt = { indent: '  ' }
  }
  opt = opt || { indent: '  ' }

  const options = {
    spaces: opt.indent !== undefined ? opt.indent : '  '
  }

  const rootAttributes = {
    xmlns: 'urn:oasis:names:tc:xliff:document:2.0',
    version: '2.0',
    srcLang: obj.sourceLanguage,
    trgLang: obj.targetLanguage
  }

  const hasSizeRestriction = !!Object.keys(obj.resources).find((nsName) => Object.keys(obj.resources[nsName]).find((k) => obj.resources[nsName][k].additionalAttributes && (obj.resources[nsName][k].additionalAttributes.sizeRestriction !== undefined || obj.resources[nsName][k].additionalAttributes['slr:sizeRestriction'] !== undefined)))
  if (hasSizeRestriction) rootAttributes['xmlns:slr'] = 'urn:oasis:names:tc:xliff:sizerestriction:2.0'

  const root = makeElement('xliff', rootAttributes, true)

  Object.keys(obj.resources).forEach((nsName) => {
    const fileChildren = createUnitTags(obj.resources[nsName])
    const f = makeElement('file', { id: nsName }, fileChildren)
    root.elements.push(f)
  })

  const xmlJs = {
    elements: [root]
  }

  const xml = convert.js2xml(xmlJs, options)
  if (cb) cb(null, xml)
  return xml
}

/**
 * Creates unit tags for translation elements
 * @param {Object} unitElements - Object containing translation units
 * @returns {Array} Array of unit elements
 * @private
 */
function createUnitTags (unitElements) {
  const hasSizeRestriction = !!Object.keys(unitElements).find((k) => unitElements[k].additionalAttributes && (unitElements[k].additionalAttributes.sizeRestriction !== undefined || unitElements[k].additionalAttributes['slr:sizeRestriction'] !== undefined))
  const preElements = []
  if (hasSizeRestriction) {
    preElements.push({
      type: 'element',
      name: 'slr:profiles',
      attributes: { generalProfile: 'xliff:codepoints', storageProfile: 'xliff:utf8' },
      elements: [{
        type: 'element',
        name: 'slr:normalization',
        attributes: { general: 'nfc', storage: 'nfc' }
      }]
    })
  }
  return preElements.concat(Object.keys(unitElements).map((key) => {
    if (unitElements[key].groupUnits) {
      return createGroupUnitTag(key, unitElements[key])
    } else {
      return createUnitTag(key, unitElements[key])
    }
  }))
}

/**
 * Creates a group unit tag
 * @param {string} id - Group identifier
 * @param {Object} group - Group object containing translation units
 * @param {Object} [group.additionalAttributes] - Additional attributes for the group
 * @param {Object} group.groupUnits - Nested translation units
 * @returns {Object} Group unit element
 * @private
 */
function createGroupUnitTag (id, group) {
  const additionalAttributes = group.additionalAttributes != null ? group.additionalAttributes : {}
  const groupUnits = createUnitTags(group.groupUnits)
  return makeElement('group', Object.assign({ id: escape(id) }, additionalAttributes), groupUnits)
}

/**
 * Creates a single unit tag
 * @param {string} id - Unit identifier
 * @param {Object} unit - Unit object containing translation data
 * @param {string} [unit.source] - Source text
 * @param {string} [unit.target] - Target text
 * @param {string|Array} [unit.note] - Notes for the unit
 * @param {Object} [unit.additionalAttributes] - Additional attributes for the unit
 * @returns {Object} Unit element
 * @private
 */
function createUnitTag (id, unit) {
  const segment = makeElement('segment', null, true)
  if (!unit.source && unit.target) unit.source = ''
  if (unit.source !== undefined) segment.elements.push(makeElement('source', null, makeValue(unit.source, ElementTypes2)))
  if (unit.target !== undefined) segment.elements.push(makeElement('target', null, makeValue(unit.target, ElementTypes2)))
  const subEle = [segment]
  if ('note' in unit) {
    const noteElms = []
    createNoteObjects(unit.note).forEach(noteObj => {
      noteElms.push(makeElement('note', null, [noteObj]))
    })
    subEle.unshift(makeElement('notes', null, noteElms))
  }
  const additionalAttributes = unit.additionalAttributes != null ? { ...unit.additionalAttributes } : {}
  if (additionalAttributes.sizeRestriction) {
    additionalAttributes['slr:sizeRestriction'] = additionalAttributes.sizeRestriction + ''
    delete additionalAttributes.sizeRestriction
  }
  return makeElement('unit', Object.assign({ id: escape(id) }, additionalAttributes), subEle)
}

/**
 * Creates note objects from a note string or array
 * @param {string|Array} note - Note content
 * @returns {Array} Array of note objects
 * @private
 */
function createNoteObjects (note) {
  const arrNote = []
  const baseNote = makeText(note)
  if (Array.isArray(baseNote.text)) {
    baseNote.text.forEach(text => {
      arrNote.push({ type: baseNote.type, text })
    })
  } else {
    arrNote.push(baseNote)
  }
  return arrNote
}

/**
 * Converts JavaScript object to XLIFF format with Promise support
 * @param {Object} obj - The source object to convert
 * @param {string} obj.sourceLanguage - Source language code
 * @param {string} obj.targetLanguage - Target language code
 * @param {Object} obj.resources - Translation resources
 * @param {Object} [opt] - Options for conversion
 * @param {string} [opt.indent='  '] - Indentation string
 * @param {Function} [cb] - Optional callback function
 * @returns {Promise<string>|string} XLIFF formatted XML string or Promise
 */
const js2xliff = (obj, opt, cb) => {
  if (!cb && opt === undefined) {
    return new Promise((resolve, reject) => js2xliffClb(obj, opt, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  if (!cb && typeof opt !== 'function') {
    return new Promise((resolve, reject) => js2xliffClb(obj, opt, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  return js2xliffClb(obj, opt, cb)
}

js2xliff.js2xliffClb = js2xliffClb

export default js2xliff
