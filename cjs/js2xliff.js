"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _xmlJs = _interopRequireDefault(require("xml-js"));
var _ElementTypes = _interopRequireDefault(require("./inline-elements/ElementTypes2.js"));
var _objectToXml = require("./xml-js/objectToXml.js");
var _escape = _interopRequireDefault(require("./util/escape.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var js2xliffClb = function js2xliffClb(obj, opt, cb) {
  if (!cb && typeof opt === 'function') {
    cb = opt;
    opt = {
      indent: '  '
    };
  }
  opt = opt || {
    indent: '  '
  };
  var options = {
    spaces: opt.indent !== undefined ? opt.indent : '  '
  };
  var rootAttributes = {
    xmlns: 'urn:oasis:names:tc:xliff:document:2.0',
    version: '2.0',
    srcLang: obj.sourceLanguage,
    trgLang: obj.targetLanguage
  };
  var hasSizeRestriction = !!Object.keys(obj.resources).find(function (nsName) {
    return Object.keys(obj.resources[nsName]).find(function (k) {
      return obj.resources[nsName][k].additionalAttributes && (obj.resources[nsName][k].additionalAttributes.sizeRestriction !== undefined || obj.resources[nsName][k].additionalAttributes['slr:sizeRestriction'] !== undefined);
    });
  });
  if (hasSizeRestriction) rootAttributes['xmlns:slr'] = 'urn:oasis:names:tc:xliff:sizerestriction:2.0';
  var root = (0, _objectToXml.makeElement)('xliff', rootAttributes, true);
  Object.keys(obj.resources).forEach(function (nsName) {
    var fileChildren = createUnitTags(obj.resources[nsName]);
    var f = (0, _objectToXml.makeElement)('file', {
      id: nsName
    }, fileChildren);
    root.elements.push(f);
  });
  var xmlJs = {
    elements: [root]
  };
  var xml = _xmlJs.default.js2xml(xmlJs, options);
  if (cb) cb(null, xml);
  return xml;
};
function createUnitTags(unitElements) {
  var hasSizeRestriction = !!Object.keys(unitElements).find(function (k) {
    return unitElements[k].additionalAttributes && (unitElements[k].additionalAttributes.sizeRestriction !== undefined || unitElements[k].additionalAttributes['slr:sizeRestriction'] !== undefined);
  });
  var preElements = [];
  if (hasSizeRestriction) {
    preElements.push({
      type: 'element',
      name: 'slr:profiles',
      attributes: {
        generalProfile: 'xliff:codepoints',
        storageProfile: 'xliff:utf8'
      },
      elements: [{
        type: 'element',
        name: 'slr:normalization',
        attributes: {
          general: 'nfc',
          storage: 'nfc'
        }
      }]
    });
  }
  return preElements.concat(Object.keys(unitElements).map(function (key) {
    if (unitElements[key].groupUnits) {
      return createGroupUnitTag(key, unitElements[key]);
    } else {
      return createUnitTag(key, unitElements[key]);
    }
  }));
}
function createGroupUnitTag(id, group) {
  var additionalAttributes = group.additionalAttributes != null ? group.additionalAttributes : {};
  var groupUnits = createUnitTags(group.groupUnits);
  return (0, _objectToXml.makeElement)('group', Object.assign({
    id: (0, _escape.default)(id)
  }, additionalAttributes), groupUnits);
}
function createUnitTag(id, unit) {
  var segment = (0, _objectToXml.makeElement)('segment', null, true);
  if (!unit.source && unit.target) unit.source = '';
  if (unit.source !== undefined) segment.elements.push((0, _objectToXml.makeElement)('source', null, (0, _objectToXml.makeValue)(unit.source, _ElementTypes.default)));
  if (unit.target !== undefined) segment.elements.push((0, _objectToXml.makeElement)('target', null, (0, _objectToXml.makeValue)(unit.target, _ElementTypes.default)));
  var subEle = [segment];
  if ('note' in unit) {
    var noteElms = [];
    createNoteObjects(unit.note).forEach(function (noteObj) {
      noteElms.push((0, _objectToXml.makeElement)('note', null, [noteObj]));
    });
    subEle.unshift((0, _objectToXml.makeElement)('notes', null, noteElms));
  }
  var additionalAttributes = unit.additionalAttributes != null ? _objectSpread({}, unit.additionalAttributes) : {};
  if (additionalAttributes.sizeRestriction) {
    additionalAttributes['slr:sizeRestriction'] = additionalAttributes.sizeRestriction + '';
    delete additionalAttributes.sizeRestriction;
  }
  return (0, _objectToXml.makeElement)('unit', Object.assign({
    id: (0, _escape.default)(id)
  }, additionalAttributes), subEle);
}
function createNoteObjects(note) {
  var arrNote = [];
  var baseNote = (0, _objectToXml.makeText)(note);
  if (Array.isArray(baseNote.text)) {
    baseNote.text.forEach(function (text) {
      arrNote.push({
        type: baseNote.type,
        text: text
      });
    });
  } else {
    arrNote.push(baseNote);
  }
  return arrNote;
}
var js2xliff = function js2xliff(obj, opt, cb) {
  if (!cb && opt === undefined) {
    return new Promise(function (resolve, reject) {
      return js2xliffClb(obj, opt, function (err, ret) {
        return err ? reject(err) : resolve(ret);
      });
    });
  }
  if (!cb && typeof opt !== 'function') {
    return new Promise(function (resolve, reject) {
      return js2xliffClb(obj, opt, function (err, ret) {
        return err ? reject(err) : resolve(ret);
      });
    });
  }
  return js2xliffClb(obj, opt, cb);
};
js2xliff.js2xliffClb = js2xliffClb;
var _default = exports.default = js2xliff;
module.exports = exports.default;