#!/usr/bin/env node

import Filter from './lib/filter.js'
import QueryFieldGroup from './lib/query-field-group.js'
import UrlBuilder from './lib/url-builder.js'
import { Command } from 'commander'
import open from 'open'
import enquirer from 'enquirer'
import FilterSettingsCliIO from './lib/filter-settings-cli-io.js'
import FilterSettingsFileIO from './lib/filter-settings-file-io.js'

const { Form } = enquirer

main()

async function main () {
  const options = getOption()
  const isConfigureMode = options.c
  const needsSetTemporaryFilterManually = options.m
  const notOpenUrlInBrowser = options.n

  if (isConfigureMode) {
    await configureDefaultFilter()
  } else {
    const queryFields = await inputSearchQueryFields()
    let filter = new Filter({})
    if (needsSetTemporaryFilterManually) {
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
  const filterSettingsFileIO = new FilterSettingsFileIO()
  const filterSettingsCliIO = new FilterSettingsCliIO()

  const currentFilter = await filterSettingsFileIO.load()
  console.log('Current default filter settings:')
  console.log(currentFilter)

  console.log('Set your new filter settings:')
  const updatedFilter = await filterSettingsCliIO.input()
  return await filterSettingsFileIO.save(updatedFilter)
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

  console.log(queryFieldGroup)

  return queryFieldGroup
}

async function setFilter () {
  console.log('Then narrow your results by...')
  const filterSettingsCliIO = new FilterSettingsCliIO()

  return await filterSettingsCliIO.input()
}

async function applyDefaultFilter () {
  const filterSettingsFileIO = new FilterSettingsFileIO()
  const currentFilter = await filterSettingsFileIO.load()
  console.log('Applied filter:')
  console.log(currentFilter)

  return currentFilter
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
