import { Filter, QueryFieldGroup, UrlBuilder, OPERATORS } from './index.js'

const query = new QueryFieldGroup({ queryWords: 'what is bullet train', except: 'movie' })
const filter = new Filter({ language: OPERATORS.language.English, region: OPERATORS.region.any, siteOrDomain: 'wikipedia.org', lastUpdate: OPERATORS.lastUpdate.pastYear })
const urlBuilder = new UrlBuilder()

console.log('URL: ')
console.log(urlBuilder.generateGoogleSearchUrl(query, filter))
