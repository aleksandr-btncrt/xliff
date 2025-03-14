/**
 * Sets a segment in the translation structure
 * @param {Object} category - The category object to set the segment in
 * @param {Object} srcObj - Source object containing original text
 * @param {Object} trgObj - Target object containing translated text
 * @param {Object} ntObj - Notes object containing additional notes (optional)
 * @param {string} key - The key to process
 */
function setSegment (category, srcObj, trgObj, ntObj, key) {
  const srcValue = srcObj[key]
  const trgValue = trgObj[key]

  if (typeof srcValue === 'object' && typeof trgValue === 'object') {
    category[key] = { groupUnits: {} }
    const grpObj = category[key].groupUnits

    Object.keys(srcValue).forEach(grpKey => {
      setSegment(grpObj, srcObj[key], trgObj[key], ntObj[key], grpKey)

      if (ntObj && ntObj[key] && ntObj[key][grpKey]) {
        category[key].note = ntObj[key][grpKey]
      }
    })
  } else {
    category[key] = { source: srcValue, target: trgValue }

    if (ntObj && ntObj[key]) {
      category[key].note = ntObj[key]
    }
  }
}

/**
 * Callback function for creating translation structure
 * @param {string} srcLng - Source language code
 * @param {string} trgLng - Target language code
 * @param {Object} srcKeys - Source translations object
 * @param {Object} trgKeys - Target translations object
 * @param {Object} ntKeys - Notes object (optional)
 * @param {string} ns - Namespace (optional)
 * @param {Function} cb - Callback function (optional)
 * @returns {Object} Translation structure object
 */
const createjsClb = (srcLng, trgLng, srcKeys, trgKeys, ntKeys, ns, cb) => {
  const js = {
    sourceLanguage: srcLng,
    targetLanguage: trgLng,
    resources: {}
  }

  if (!cb && (!ns || typeof ns !== 'string')) {
    cb = ns
    ns = null
  }

  trgKeys = trgKeys || {}

  const keys = Object.keys(srcKeys)
  Object.keys(trgKeys).forEach((k) => {
    if (keys.indexOf(k) < 0) keys.push(k)
  })

  if (ns && typeof ns === 'string') {
    js.resources[ns] = {}
    const nsObj = js.resources[ns]

    keys.forEach((srcKey) => {
      setSegment(nsObj, srcKeys, trgKeys, ntKeys, srcKey)
    })

    if (cb) cb(null, js)
    return js
  }

  keys.forEach((ns) => {
    js.resources[ns] = {}

    Object.keys(srcKeys[ns]).forEach((srcKey) => {
      setSegment(js.resources[ns], srcKeys[ns], trgKeys[ns], ntKeys && ntKeys[ns], srcKey)
    })
  })

  if (cb) cb(null, js)
  return js
}

/**
 * Creates a translation structure with support for promises
 * @param {string} srcLng - Source language code
 * @param {string} trgLng - Target language code
 * @param {Object} srcKeys - Source translations object
 * @param {Object} trgKeys - Target translations object
 * @param {string} ns - Namespace (optional)
 * @param {Function} cb - Callback function (optional)
 * @param {Object} ntKeys - Notes object (optional)
 * @returns {Object|Promise} Translation structure object or Promise
 */
const createjs = (srcLng, trgLng, srcKeys, trgKeys, ns, cb, ntKeys) => {
  if (!cb && ns === undefined) {
    return new Promise((resolve, reject) => createjsClb(srcLng, trgLng, srcKeys, trgKeys, ntKeys, ns, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  if (!cb && typeof ns !== 'function') {
    return new Promise((resolve, reject) => createjsClb(srcLng, trgLng, srcKeys, trgKeys, ntKeys, ns, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  return createjsClb(srcLng, trgLng, srcKeys, trgKeys, ntKeys, ns, cb)
}

createjs.createjsClb = createjsClb

export default createjs
