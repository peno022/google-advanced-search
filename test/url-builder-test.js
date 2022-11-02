import * as assert from 'node:assert'
import { Filter, QueryFieldGroup, UrlBuilder } from '../index.js'

describe('the input formatting function of UrlBuilder', function () {
  const urlBuilder = new UrlBuilder()

  it('trims an empty space in the beginning or end of input', async () => {
    const result = urlBuilder.formatInputForURL(' Hello ')
    const expected = 'Hello'
    assert.strictEqual(result, expected)
  })

  it('trims empty spaces in the beginning or end of input', async () => {
    const result = urlBuilder.formatInputForURL('  HelloWithSpaces 　')
    const expected = 'HelloWithSpaces'
    assert.strictEqual(result, expected)
  })

  it('replaces empty spaces in the middle of input with +', async () => {
    const result = urlBuilder.formatInputForURL('word1 word2 word3')
    const expected = 'word1+word2+word3'
    assert.strictEqual(result, expected)
  })

  it('replaces a series of empty spaces in the middle of input with +', async () => {
    const result = urlBuilder.formatInputForURL('word1  word2   word3')
    const expected = 'word1++word2+++word3'
    assert.strictEqual(result, expected)
  })

  it('escapes characters for url', async () => {
    const result = urlBuilder.formatInputForURL('they are escaped ;,/?:@&=+$# and they are not -_.!~*\'()')
    const expected = 'they are escaped %3B%2C%2F%3F%3A%40%26%3D%2B%24%23 and they are not -_.!~*\'()'
    assert.strictEqual(result, expected)
  })

  it('reutrns an empty string if input is an empty string', async () => {
    const result = urlBuilder.formatInputForURL('')
    const expected = ''
    assert.strictEqual(result, expected)
  })

  it('trims empty spaces in the beginning or end of input, and escapes characters for url, and then replaces empty spaces in the middle of input with +', async () => {
    const result = urlBuilder.formatInputForURL('  Japanese+ food!  ')
    const expected = 'Japanese%2B+food%21'
    assert.strictEqual(result, expected)
  })
})

describe('the URL generation function of UrlBuilder', function () {
  it('generates Google Search URL with given query fields and filter (using the filter of which all operators are set to initial defaults.)', async () => {
    const query = new QueryFieldGroup(
      {
        queryWords: 'aaa',
        exactWords: 'bbb',
        anyOfTheseWords: 'ccc',
        except: 'ddd',
        numbersRangingFrom: '10',
        numbersRangingTo: '100'
      }
    )
    const filter = new Filter(
      {}
    )
    const urlBuilder = new UrlBuilder()
    const expected = 'https://www.google.com/search?as_q=aaa&as_epq=bbb&as_oq=ccc&as_eq=ddd&as_nlo=10&as_nhi=100&lr=&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=images&as_filetype=&tbs='
    const result = urlBuilder.generateGoogleSearchUrl(query, filter)

    assert.strictEqual(result, expected)
  })

  it('generates Google Search URL with given query fields and filter (using the filter of which all operators are set to non-default)', async () => {
    const query = new QueryFieldGroup(
      {
        queryWords: 'what is bullet train?',
        except: 'movie'
      }
    )
    const filter = new Filter(
      {
        language: 'English',
        region: 'United_Kingdom',
        lastUpdate: 'pastYear',
        siteOrDomain: 'wikipedia.org',
        termsAppearing: 'inTheTextOfThePage',
        safeSearch: 'hideExplicitResults',
        fileType: 'pdf',
        usageRights: 'freeToUseOrShare'
      }
    )
    const urlBuilder = new UrlBuilder()
    const expected = 'https://www.google.com/search?as_q=what+is+bullet+train%3F&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_en&cr=countryGB&as_qdr=y&as_sitesearch=wikipedia.org&as_occt=body&safe=active&as_filetype=pdf&tbs=sur%3Af'
    const result = urlBuilder.generateGoogleSearchUrl(query, filter)

    assert.strictEqual(result, expected)
  })

  it('returns an url even if the query fields are all empty', async () => {
    const query = new QueryFieldGroup(
      {
        queryWords: '',
        exactWords: '',
        anyOfTheseWords: '',
        except: '',
        numbersRangingFrom: '',
        numbersRangingTo: ''
      }
    )
    const filter = new Filter({})
    const urlBuilder = new UrlBuilder()
    const expected = 'https://www.google.com/search?as_q=&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=images&as_filetype=&tbs='
    const result = urlBuilder.generateGoogleSearchUrl(query, filter)

    assert.strictEqual(result, expected)
  })
})
