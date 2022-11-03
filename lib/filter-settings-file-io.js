import { readFile, writeFile } from 'node:fs/promises'
import Filter from './filter.js'

export default class FilterSettingsFileIO {
  #DEFAULT_PATH = '../config/default-filter.json'

  constructor () {
    this.fileUrl = new URL(this.#DEFAULT_PATH, import.meta.url)
  }

  getDefaultUrl () {
    return new URL(this.#DEFAULT_PATH, import.meta.url)
  }

  setFileUrl (path) {
    this.fileUrl = new URL(path, import.meta.url)
    return this.fileUrl
  }

  async load () {
    try {
      const json = await readFile(this.fileUrl)
      const filter = new Filter(JSON.parse(json))
      return filter
    } catch (error) {
      console.log(error.toString())
      return error
    }
  }

  async save (filter) {
    if (filter instanceof Filter) {
      try {
        await writeFile(this.fileUrl, JSON.stringify(filter))
        return filter
      } catch (error) {
        console.log(error.toString())
        return error
      }
    } else {
      return new Error('The argument must be an instance of Filter')
    }
  }
}
