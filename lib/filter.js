import * as operators from './operators.js'
import { readFile, writeFile } from 'node:fs/promises'

const OPERATORS = operators.OPERATORS

export default class Filter {
  constructor ({
    language = OPERATORS.language.any,
    region = OPERATORS.region.any,
    lastUpdate = OPERATORS.lastUpdate.anytime,
    siteOrDomain = '',
    termsAppearing = OPERATORS.termsAppearing.anywhereInThePage,
    safeSearch = OPERATORS.safeSearch.showExplicitResults,
    fileType = OPERATORS.fileType.any,
    usageRights = OPERATORS.usageRights.any
  }
  ) {
    this.language = language
    this.region = region
    this.lastUpdate = lastUpdate
    this.siteOrDomain = siteOrDomain
    this.termsAppearing = termsAppearing
    this.safeSearch = safeSearch
    this.fileType = fileType
    this.usageRights = usageRights
  }

  static DATA_FILE_URL = new URL('../config/default-filter.json', import.meta.url)

  static async readDefaultSettings () {
    const json = JSON.parse(
      await readFile(this.DATA_FILE_URL)
    )

    return new Filter({
      language: OPERATORS.language[json.language],
      region: OPERATORS.region[json.region],
      lastUpdate: OPERATORS.lastUpdate[json.lastUpdate],
      siteOrDomain: json.siteOrDomain,
      termsAppearing: OPERATORS.termsAppearing[json.termsAppearing],
      safeSearch: OPERATORS.safeSearch[json.safeSearch],
      fileType: OPERATORS.fileType[json.fileType],
      usageRights: OPERATORS.usageRights[json.usageRights]
    })
  }

  static async saveDefaultSettings (filter) {
    const data = filter.convertToOperatorAndKeys()
    await writeFile(this.DATA_FILE_URL, JSON.stringify(data))
  }

  display () {
    console.log(this.convertToOperatorAndKeys())
  }

  getKeyByValue (object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  convertToOperatorAndKeys () {
    return {
      language: this.getKeyByValue(OPERATORS.language, this.language),
      region: this.getKeyByValue(OPERATORS.region, this.region),
      lastUpdate: this.getKeyByValue(OPERATORS.lastUpdate, this.lastUpdate),
      siteOrDomain: this.siteOrDomain,
      termsAppearing: this.getKeyByValue(OPERATORS.termsAppearing, this.termsAppearing),
      safeSearch: this.getKeyByValue(OPERATORS.safeSearch, this.safeSearch),
      fileType: this.getKeyByValue(OPERATORS.fileType, this.fileType),
      usageRights: this.getKeyByValue(OPERATORS.usageRights, this.usageRights)
    }
  }
}
