export default class UrlBuilder {
  static #baseUrl = 'https://www.google.com/search?'

  formatInputForURL (words) {
    return encodeURI(words.trim().replace(/\s+/g, '+'))
  }

  generateGoogleSearchUrl (queryFieldGroup, filter) {
    const url = UrlBuilder.#baseUrl +
                `&as_q=${this.formatInputForURL(queryFieldGroup.queryWords)}` +
                `&as_epq=${this.formatInputForURL(queryFieldGroup.exactWords)}` +
                `&as_oq=${this.formatInputForURL(queryFieldGroup.anyOfTheseWords)}` +
                `&as_eq=${this.formatInputForURL(queryFieldGroup.except)}` +
                `&as_nlo=${this.formatInputForURL(queryFieldGroup.numbersRangingFrom)}` +
                `&as_nhi=${this.formatInputForURL(queryFieldGroup.numbersRangingTo)}` +
                `&lr=${filter.language.description}` +
                `&cr=${filter.region.description}` +
                `&as_qdr=${filter.lastUpdate.description}` +
                `&as_sitesearch=${this.formatInputForURL(filter.siteOrDomain)}` +
                `&as_occt=${filter.termsAppearing.description}` +
                `&safe=${filter.safeSearch.description}` +
                `&as_filetype=${filter.fileType.description}` +
                `&tbs=${filter.usageRights.description}`

    return url
  }
}
