import { OPERATORS_DEFAULT } from "./operators.js";

export default class Filter {
  constructor({
    language = OPERATORS_DEFAULT.language,
    region = OPERATORS_DEFAULT.region,
    lastUpdate = OPERATORS_DEFAULT.lastUpdate,
    siteOrDomain = "",
    termsAppearing = OPERATORS_DEFAULT.termsAppearing,
    safeSearch = OPERATORS_DEFAULT.safeSearch,
    fileType = OPERATORS_DEFAULT.fileType,
    usageRights = OPERATORS_DEFAULT.usageRights,
  }) {
    this.language = language;
    this.region = region;
    this.lastUpdate = lastUpdate;
    this.siteOrDomain = siteOrDomain;
    this.termsAppearing = termsAppearing;
    this.safeSearch = safeSearch;
    this.fileType = fileType;
    this.usageRights = usageRights;
  }
}
