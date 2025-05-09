"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xliffToJs;
var _xmlJs = _interopRequireDefault(require("xml-js"));
var _ElementTypes = _interopRequireDefault(require("./inline-elements/ElementTypes2.js"));
var _xmlToObject = require("./xml-js/xmlToObject.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var xliffToJsClb = function xliffToJsClb(str, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options = options || {};
  if (typeof str !== 'string') {
    var err = new Error('The first parameter was not a string');
    if (cb) return cb(err);
    return err;
  }
  var result = {};
  var xmlObj;
  try {
    xmlObj = _xmlJs.default.xml2js(str, {});
  } catch (err) {
    if (cb) return cb(err);
    return err;
  }
  var xliffRoot = xmlObj.elements.find(function (ele) {
    return ele.name === 'xliff';
  });
  if (xliffRoot.attributes) {
    try {
      var srcLang = xliffRoot.attributes.srcLang;
      var trgLang = xliffRoot.attributes.trgLang;
      result.sourceLanguage = srcLang;
      result.targetLanguage = trgLang;
      if (!result.targetLanguage) delete result.targetLanguage;
      xliffRoot.elements = xliffRoot.elements.filter(function (child) {
        return child.type !== 'comment';
      });
      result.resources = xliffRoot.elements.reduce(function (resources, file) {
        var namespace = options.namespace || file.attributes.id;
        var initValues = {};
        if (!result.targetLanguage) delete initValues.target;
        file.elements = file.elements || [];
        file.elements = file.elements.filter(function (child) {
          return child.type !== 'comment';
        });
        resources[namespace] = createUnits(file, initValues);
        return resources;
      }, {});
    } catch (error) {
      if (cb) return cb(error, result);
    }
  }
  if (cb) return cb(null, result);
  return result;
};
function createUnits(parent, initValues) {
  if (!parent.elements) return {};
  return parent.elements.reduce(function (file, unit) {
    var key = unit.attributes.id;
    var additionalAttributes = unit.attributes;
    delete additionalAttributes.id;
    if (additionalAttributes['slr:sizeRestriction'] !== undefined) {
      additionalAttributes.sizeRestriction = additionalAttributes['slr:sizeRestriction'];
      if (typeof additionalAttributes.sizeRestriction === 'string') additionalAttributes.sizeRestriction = parseInt(additionalAttributes.sizeRestriction);
      delete additionalAttributes['slr:sizeRestriction'];
    }
    switch (unit.name) {
      case 'unit':
        file[key] = createUnit(unit, initValues);
        if (Object.keys(additionalAttributes).length) {
          Object.assign(file[key], {
            additionalAttributes: additionalAttributes
          });
        }
        return file;
      case 'group':
        file[key] = {
          groupUnits: createUnits(unit, initValues)
        };
        if (Object.keys(additionalAttributes).length) {
          Object.assign(file[key], {
            additionalAttributes: additionalAttributes
          });
        }
        return file;
      default:
        return file;
    }
  }, {});
}
function createUnit(unit, initValues) {
  if (!unit.elements) return undefined;
  return unit.elements.reduce(function (unit, segment) {
    if (['segment', 'notes'].indexOf(segment.name) < 0) return unit;
    segment.elements.forEach(function (element) {
      var value = (0, _xmlToObject.extractValue)(element.elements, _ElementTypes.default);
      switch (element.name) {
        case 'source':
        case 'target':
          unit[element.name] = value;
          break;
        case 'note':
          if (unit[element.name]) {
            if (!Array.isArray(unit[element.name])) {
              unit[element.name] = [unit[element.name]];
            }
            unit[element.name].push(value);
          } else {
            unit[element.name] = value;
          }
          break;
      }
    });
    return unit;
  }, JSON.parse(JSON.stringify(initValues)));
}
function xliffToJs(str, options, cb) {
  if (!cb && options === undefined) {
    return new Promise(function (resolve, reject) {
      return xliffToJsClb(str, options, function (err, ret) {
        return err ? reject(err) : resolve(ret);
      });
    });
  }
  if (!cb && typeof options !== 'function') {
    return new Promise(function (resolve, reject) {
      return xliffToJsClb(str, options, function (err, ret) {
        return err ? reject(err) : resolve(ret);
      });
    });
  }
  xliffToJsClb(str, options, cb);
}
module.exports = exports.default;