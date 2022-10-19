export default class QueryFieldGroup {
  constructor ({ queryWords = '', exact = '', anyOf = '', except = '', numbersRangingFrom = '', numbersRangingTo = '' }) {
    this.queryWords = queryWords
    this.exactWords = exact
    this.anyOfTheseWords = anyOf
    this.except = except
    this.numbersRangingFrom = numbersRangingFrom
    this.numbersRangingTo = numbersRangingTo
  }
}
