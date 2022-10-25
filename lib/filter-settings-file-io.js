import { readFile, writeFile } from 'node:fs/promises'
import Filter from './filter.js'

export default class FilterSettingsFileIO {
  #DEFAULT_PATH = './config/default-filter.json'

  constructor () {
    this.fileUrl = this.#DEFAULT_PATH
  }

  getDefaultUrl () {
    return new URL(this.#DEFAULT_PATH, import.meta.url)
  }

  setFileUrl (path) {
    this.fileUrl = new URL(path, import.meta.url)
  }

  async load () {
    const json = JSON.parse(
      await readFile(this.fileUrl)
    )
    return new Filter(json)
  }

  async save (filter) {
    await writeFile(this.fileUrl, JSON.stringify(filter))
  }
}
