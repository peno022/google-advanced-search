#!/usr/bin/env node

import Filter from './lib/filter.js'
import QueryFieldGroup from './lib/query-field-group.js'
import UrlBuilder from './lib/url-builder.js'
import { OPERATORS } from './lib/operators.js'
import { Command } from 'commander'
import open from 'open'
import enquirer from 'enquirer'

const { Form, AutoComplete, Select, Input } = enquirer

main()

async function main () {
  const options = getOption()
  const isConfigureMode = options.c
  const needsSetFilterManually = options.m
  const notOpenUrlInBrowser = options.n

  if (isConfigureMode) {
    await configureDefaultFilter()
  } else {
    const queryFields = await inputSearchQueryFields()
    let filter = new Filter({})
    if (needsSetFilterManually) {
      filter = await setFilter()
    } else {
      filter = await applyDefaultFilter()
    }
    displayUrl(queryFields, filter, notOpenUrlInBrowser)
  }
}

function getOption () {
  const program = new Command()

  program
    .option('-c', 'configure the default filter settings')
    .option('-m', 'set filter manually (do not apply the default filter settings)')
    .option('-n', 'do not open the result url in your browser')
  program.parse()

  return program.opts()
}

async function configureDefaultFilter () {
  const currentFilter = await Filter.readDefaultSettings()
  console.log('Current default filter settings:')
  currentFilter.display()

  const updatedFilter = await setFilter()
  return await Filter.saveDefaultSettings(updatedFilter)
}

async function inputSearchQueryFields () {
  const queryFieldGroup = new QueryFieldGroup({})
  const prompt = new Form({
    name: 'queryFieldGroup',
    message: 'Find pages with...',
    choices: [
      { name: 'queryWords', message: 'all these words', initial: '' },
      { name: 'exactWords', message: 'this exact word or phrase', initial: '' },
      { name: 'anyOfTheseWords', message: 'any of these words', initial: '' },
      { name: 'except', message: 'none of these words', initial: '' },
      { name: 'numbersRangingFrom', message: 'numbers ranging from', initial: '' },
      { name: 'numbersRangingTo', message: 'numbers ranging to', initial: '' }
    ]
  })

  const answer = await prompt.run()

  queryFieldGroup.queryWords = answer.queryWords
  queryFieldGroup.exactWords = answer.exactWords
  queryFieldGroup.anyOfTheseWords = answer.anyOfTheseWords
  queryFieldGroup.except = answer.except
  queryFieldGroup.numbersRangingFrom = answer.numbersRangingFrom
  queryFieldGroup.numbersRangingTo = answer.numbersRangingTo

  console.log('Search key words:', queryFieldGroup)
  return queryFieldGroup
}

async function setFilter () {
  const filter = new Filter({})
  console.log('Then narrow your results by...')
  filter.language = await inputAutoComplete('language', 'language')
  filter.region = await inputAutoComplete('region', 'region')
  filter.siteOrDomain = await input('site or domain', "'Search one site (like wikipedia.org ) or limit your results to a domain like .edu, .org or .gov'")
  filter.lastUpdate = await selectFromList('lastUpdate', 'last update')
  filter.termsAppearing = await selectFromList('termsAppearing', 'terms appearing')
  filter.safeSearch = await selectFromList('safeSearch', 'safe search')
  filter.fileType = await selectFromList('fileType', 'file type')
  filter.usageRights = await selectFromList('usageRights', 'usage rights')

  return filter
}

async function applyDefaultFilter () {
  const filter = await Filter.readDefaultSettings()
  console.log('Applied filter:')
  filter.display()
  return filter
}

async function inputAutoComplete (name, message) {
  const prompt = new AutoComplete({
    name,
    message,
    limit: 10,
    initial: 0,
    choices: Object.keys(OPERATORS[name]),
    result (value) {
      return OPERATORS[name][value]
    }
  })

  const answer = await prompt.run()
  return answer
}

async function selectFromList (name, message) {
  const prompt = new Select({
    name,
    message,
    choices: Object.keys(OPERATORS[name]),
    result (value) {
      return OPERATORS[name][value]
    }
  })

  const answer = await prompt.run()
  return answer
}

async function input (message, hint) {
  const prompt = new Input({
    message,
    hint
  })

  const answer = await prompt.run()
  return answer
}

async function displayUrl (queryFields, filter, notOpenUrlInBrowser) {
  const urlBuilder = new UrlBuilder()
  const url = urlBuilder.generateGoogleSearchUrl(queryFields, filter)
  if (notOpenUrlInBrowser) {
    console.log('Find pages in the url below:')
    console.log(url)
  } else {
    console.log('Opening the url below in your browser...')
    console.log(url)
    await open(url)
  }
}
