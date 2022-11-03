import { readFile, writeFile } from 'node:fs/promises'
import Filter from './filter.js'

export default class FilterSettingsFileIO {
  constructor (path) {
    if (typeof path === 'undefined') {
      throw new Error('The constructor requires a path argument')
    }
    this.fileUrl = new URL(path, import.meta.url)
  }

  setFileUrl (path) {
    this.fileUrl = new URL(path, import.meta.url)
    return this.fileUrl
  }

  async load () {
    try {
      const f = await readFile(this.fileUrl)
      return new Filter(JSON.parse(f))
    } catch (error) {
      console.log(error.toString())
      return error
    }
  }

  async save (filter) {
    if (!(filter instanceof Filter)) {
      return new Error('The argument must be an instance of Filter')
    }
    try {
      await writeFile(this.fileUrl, JSON.stringify(filter))
      return filter
    } catch (error) {
      console.log(error.toString())
      return error
    }
  }
}
