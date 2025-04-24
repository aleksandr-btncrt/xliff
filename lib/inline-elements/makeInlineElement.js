export default function makeInlineElement (type, attributes, contents) {
  const contentsObj = contents !== undefined ? { contents } : {}
  const dataObj = Object.assign({}, attributes, contentsObj)
  return { [type]: dataObj }
}
