const expect = require('expect.js')
const fixtures = require('./fixtures/inline-elements')

function test (what, t) {
  describe(what, () => {
    it('index', t(require('../')[what]))
    it('direct', t(require('../cjs/' + what)))
  })
}

describe('Inline elements', () => {
  describe('with codepoint elements (2.x: `<cp/>`)', ()=>{
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_codepoint.xliff, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_codepoint.js)
        done()
      })
    })
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_codepoint_missing_required_attribute.xliff, (err, res)=>{
        expect(err.message).to.eql('Hex is a required attribute for <cp> element')
        done()
      })
    })
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_codepoint_with_content.xliff, (err, res)=>{
        expect(err).to.be.ok()
        expect(err.message).to.eql('<cp> element should be empty')
        done()
      })
    })
    test('xliff2js', (fn) => (done)=>{
      fn(fixtures.example_codepoint.xliff,
        (err, res) => {
          expect(err).not.to.be.ok()
          expect(res).to.eql(fixtures.example_codepoint.js)
          done()
        }
      )
    })
  })

  describe('with markedspan elements (2.x: `<mrk>`)', ()=>{
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_markedspan.xliff, (err, res)=> {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_markedspan.js)
        done()
      })
    })
  })

  describe('with markedspanstart elements (2.x: `<sm>`)', ()=>{
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_markedspanstart.xliff, (err, res)=> {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_markedspanstart.js)
        done()
      })
    })
  })

  describe('with standalone elements (1.2: `<x/>`; 2.x: `<ph/>`)', () => {
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_standalone.xliff, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone.js)
        done()
      })
    })

    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_standalone.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone.js)
        done()
      })
    })

    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_standalone.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_standalone.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone.xliff12)
        done()
      })
    })

    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_standalone_only.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone_only.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_standalone_only.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_standalone_only.xliff12)
        done()
      })
    })
  })

  describe('with generic span elements (1.2: `<g></g>`; 2.x: `<pc></pc>`)', () => {
    // No test for xliff2js because XLIFF 2.x doesn't have a Generic Span element

    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_genericSpan.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpan.js)
        done()
      })
    })

    // This test is testing that generic-to-native type mapping works.
    // Normally you wouldn't use the generic span element for XLIFF 2
    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_genericSpan.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpan.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_genericSpan.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpan.xliff12)
        done()
      })
    })

    test('targetOfjs', (fn) => () => {
      const res = fn(fixtures.example_genericSpan.js)
      expect(res['key.nested']).to.eql(fixtures.example_genericSpan.js.resources.namespace1['key.nested'].target)
    })

    test('sourceOfjs', (fn) => () => {
      const res = fn(fixtures.example_genericSpan.js)
      expect(res['key.nested']).to.eql(fixtures.example_genericSpan.js.resources.namespace1['key.nested'].source)
    })
  })

  describe('with generic span-start and span-end elements (1.2: `<bx/>`/`<ex/>`; 2.x: `<sc/>`/<ec/>)', () => {
    // No test for xliff2js because XLIFF 2.x doesn't have Generic Span Start/End elements

    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_genericSpanStartEnd.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpanStartEnd.js)
        done()
      })
    })

    // This test is testing that generic-to-native type mapping works.
    // Normally you wouldn't use the generic span start/end elements for XLIFF 2
    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_genericSpanStartEnd.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpanStartEnd.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_genericSpanStartEnd.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_genericSpanStartEnd.xliff12)
        done()
      })
    })
  })

  describe('with native span elements (1.2: `<ph></ph>`; 2.x: `<pc></pc>`)', () => {
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_nativeSpan.xliff, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpan.js)
        done()
      })
    })

    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_nativeSpan.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpan.js)
        done()
      })
    })

    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_nativeSpan.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpan.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_nativeSpan.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpan.xliff12)
        done()
      })
    })

    test('targetOfjs', (fn) => () => {
      const res = fn(fixtures.example_nativeSpan.js)
      expect(res['key.nested']).to.eql(fixtures.example_nativeSpan.js.resources.namespace1['key.nested'].target)
    })

    test('sourceOfjs', (fn) => () => {
      const res = fn(fixtures.example_nativeSpan.js)
      expect(res['key.nested']).to.eql(fixtures.example_nativeSpan.js.resources.namespace1['key.nested'].source)
    })
  })

  describe('with native span-start and span-end elements (1.2: `<bpt></bpt>`/`<ept></ept>`; 2.x: `<sc/>`/<ec/>)', () => {
    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_nativeSpanStartEnd.xliff, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpanStartEnd.js)
        done()
      })
    })

    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_nativeSpanStartEnd.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpanStartEnd.js)
        done()
      })
    })

    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_nativeSpanStartEnd.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpanStartEnd.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_nativeSpanStartEnd.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_nativeSpanStartEnd.xliff12)
        done()
      })
    })
  })

  describe('with invalid inline object segment', () => {
    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_invalidSegment.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_invalidSegment.xliff)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_invalidSegment.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_invalidSegment.xliff12)
        done()
      })
    })
  })
})

describe('with i18next placeholders as native span elements (structured)', () => {
  test('xliff12ToJs', (fn) => (done) => {
    fn(fixtures.example_i18next_nativeSpan.xliff12, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_i18next_nativeSpan.js)
      done()
    })
  })

  test('jsToXliff12', (fn) => (done) => {
    fn(fixtures.example_i18next_nativeSpan.js, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_i18next_nativeSpan.xliff12)
      done()
    })
  })
})

describe('with i18next placeholders as native span elements (unstructured)', () => {
  test('xliff12ToJs', (fn) => (done) => {
    fn(fixtures.example_i18next_unstructured_nativeSpan.xliff12, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_i18next_unstructured_nativeSpan.js)
      done()
    })
  })

  test('jsToXliff12', (fn) => (done) => {
    fn(fixtures.example_i18next_unstructured_nativeSpan.js, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_i18next_unstructured_nativeSpan.xliff12)
      done()
    })
  })
})

describe('with marker segment', () => {
  test('jsToXliff12', (fn) => (done) => {
    fn(fixtures.example_marker.js, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_marker.xliff12)
      done()
    })
  })

  test('xliff12ToJs', (fn) => (done) => {
    fn(fixtures.example_marker.xliff12, (err, res) => {
      expect(err).not.to.be.ok()
      expect(res).to.eql(fixtures.example_marker.js)
      done()
    })
  })
})

describe('with angular', () => {
  describe('normal', () => {
    test('xliff12ToJs', (fn) => (done) => {
      fn(fixtures.example_angular.xliff12, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_angular.js)
        done()
      })
    })

    test('jsToXliff12', (fn) => (done) => {
      fn(fixtures.example_angular.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_angular.xliff12ident)
        done()
      })
    })

    test('xliff2js', (fn) => (done) => {
      fn(fixtures.example_angular.xliff, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_angular.js)
        done()
      })
    })

    test('js2xliff', (fn) => (done) => {
      fn(fixtures.example_angular.js, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res).to.eql(fixtures.example_angular.xliff)
        done()
      })
    })
  })

})
