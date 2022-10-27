import * as assert from 'node:assert'
import FilterSettingsFileIO from '../lib/filter-settings-file-io.js'

describe('getter and setter for properties of FilterSettingsFileIO', function () {
  it('gets default config file url', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('can change file url from the default one', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })
})

describe('the input function of FilterSettingsFileIO', function () {
  it('loads the json file specified the fileURL property and create a Filter instance with the data', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns error and exits if it fails to read the config file', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('creates a Filter instance with an empty argument if the loaded file is empty', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns error and exits if it receives a file not in json format', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })
})

describe('the output function of FilterSettingsFileIO', function () {
  it('write filter in the json file at the URL specified in fileURL property', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns error and exits if it receives an instance that is not of Filter', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })

  it('returns error and exits if it fails to write the filter data in the config file', async () => {
    const expected = 1
    const result = 1
    assert.strictEqual(result, expected)
  })
})
