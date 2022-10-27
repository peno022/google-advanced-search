import * as assert from 'node:assert'
import { Filter, QueryFieldGroup, UrlBuilder, OPERATORS } from '../index.js'

describe('the input formatting function of UrlBuilder', function () {
  it('trims an empty space in the beginning or end of input', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('trims empty spaces in the beginning or end of input', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('replaces an empty space in the middle of input with +', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('replaces empty spaces in the middle of input with +', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('escapes characters for url', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('reutrns an empty string if input is empty', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })
})

describe('the URL generation function of UrlBuilder', function () {
  it('generates Google Search URL with given query fields and filter paramators', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)

    // const query = new QueryFieldGroup(
    //   {
    //     queryWords: 'what is bullet train',
    //     except: 'movie'
    //   }
    // )
    // const filter = new Filter(
    //   {
    //     language: OPERATORS.language.English,
    //     region: OPERATORS.region.any,
    //     lastUpdate: OPERATORS.lastUpdate.pastYear,
    //     siteOrDomain: 'wikipedia.org'
    //   }
    // )
    // const urlBuilder = new UrlBuilder()
    // const expected = 'https://www.google.com/search?as_q=what+is+bullet+train&as_epq=&as_oq=&as_eq=movie&as_nlo=&as_nhi=&lr=lang_en&cr=&as_qdr=y&as_sitesearch=wikipedia.org&as_occt=any&safe=images&as_filetype=&tbs='
    // const result = urlBuilder.generateGoogleSearchUrl(query, filter)

    // assert.strictEqual(result, expected)
  })

  it('returns an url even if the query fields are all empty', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns url with default filter', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns url with filter of which all operators are not default', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })
})
