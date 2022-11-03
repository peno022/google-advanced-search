import { Filter, QueryFieldGroup, UrlBuilder } from "google-advanced-search";

const query = new QueryFieldGroup({
  queryWords: "what is bullet train",
  except: "movie",
});
const filter = new Filter({
  language: "English",
  region: "any",
  lastUpdate: "pastYear",
  siteOrDomain: "wikipedia.org",
  termsAppearing: "anywhereInThePage",
  safeSearch: "showExplicitResults",
  fileType: "any",
  usageRights: "any",
});
const urlBuilder = new UrlBuilder();

console.log(urlBuilder.generateGoogleSearchUrl(query, filter));
