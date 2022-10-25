import { Filter, QueryFieldGroup, UrlBuilder } from './index.js'

const query = new QueryFieldGroup({ queryWords: 'what is bullet train', except: 'movie' })
const filter = new Filter({
  language: 'English',
  region: 'any',
  siteOrDomain: 'wikipedia.org',
  lastUpdate: 'pastYear'
})
const urlBuilder = new UrlBuilder()

console.log('URL: ')
console.log(urlBuilder.generateGoogleSearchUrl(query, filter))
