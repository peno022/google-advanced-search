export default class QueryFieldGroup {
  constructor ({ queryWords = '', exactWords = '', anyOfTheseWords = '', except = '', numbersRangingFrom = '', numbersRangingTo = '' }) {
    this.queryWords = queryWords
    this.exactWords = exactWords
    this.anyOfTheseWords = anyOfTheseWords
    this.except = except
    this.numbersRangingFrom = numbersRangingFrom
    this.numbersRangingTo = numbersRangingTo
  }
}
