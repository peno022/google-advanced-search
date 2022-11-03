import { OPERATORS } from './operators.js'

export default class UrlBuilder {
  static #baseUrl = 'https://www.google.com/search?'

  /**
   * Replace spaces with '+' and remove any leading or trailing spaces.
   * @param {string} words - The string to be formatted.
   * */
  formatInputForURL (words) {
    const wordsArray = words.trim().split(' ')
    const encodedWordsArray = wordsArray.map(word => encodeURIComponent(word))
    return encodedWordsArray.join('+')
  }

  generateGoogleSearchUrl (queryFieldGroup, filter) {
    return UrlBuilder.#baseUrl +
                `as_q=${this.formatInputForURL(queryFieldGroup.queryWords)}` +
                `&as_epq=${this.formatInputForURL(queryFieldGroup.exactWords)}` +
                `&as_oq=${this.formatInputForURL(queryFieldGroup.anyOfTheseWords)}` +
                `&as_eq=${this.formatInputForURL(queryFieldGroup.except)}` +
                `&as_nlo=${this.formatInputForURL(queryFieldGroup.numbersRangingFrom)}` +
                `&as_nhi=${this.formatInputForURL(queryFieldGroup.numbersRangingTo)}` +
                `&lr=${OPERATORS.language[filter.language]}` +
                `&cr=${OPERATORS.region[filter.region]}` +
                `&as_qdr=${OPERATORS.lastUpdate[filter.lastUpdate]}` +
                `&as_sitesearch=${this.formatInputForURL(filter.siteOrDomain)}` +
                `&as_occt=${OPERATORS.termsAppearing[filter.termsAppearing]}` +
                `&safe=${OPERATORS.safeSearch[filter.safeSearch]}` +
                `&as_filetype=${OPERATORS.fileType[filter.fileType]}` +
                `&tbs=${OPERATORS.usageRights[filter.usageRights]}`
  }
}
