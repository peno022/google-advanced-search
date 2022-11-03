#!/usr/bin/env node

import Filter from "./lib/filter.js";
import QueryFieldGroup from "./lib/query-field-group.js";
import UrlBuilder from "./lib/url-builder.js";
import { Command } from "commander";
import open from "open";
import enquirer from "enquirer";
import FilterSettingsCliIO from "./lib/filter-settings-cli-io.js";
import FilterSettingsFileIO from "./lib/filter-settings-file-io.js";

const { Form } = enquirer;
const DEFAULT_FILTER_PATH = "../config/default-filter.json";

main();

async function main() {
  const options = getOption();

  if (options.configure) {
    await configureDefaultFilter();
  } else {
    const queryFields = await inputSearchQueryFields();
    let filter = new Filter({});
    if (options.temporary) {
      filter = await setFilter();
    } else {
      filter = await applyDefaultFilter();
    }
    displayUrl(queryFields, filter, options.notOpening);
  }
}

function getOption() {
  const program = new Command();

  program
    .option("-c, --configure", "configure the default filter settings")
    .option(
      "-t, --temporary",
      "search with temporary filter (does not apply the default filter settings)"
    )
    .option(
      "-n, --not-opening",
      "display the result URL without opening your browser"
    );
  program.parse();

  return program.opts();
}

async function configureDefaultFilter() {
  async function displayCurrentFilter(filterSettingsFileIO) {
    const currentFilter = await filterSettingsFileIO.load();
    if (currentFilter instanceof Error) {
      process.exit(1);
    }
    console.log("Current default filter settings:");
    console.log(currentFilter);
  }

  async function updateFilter(filterSettingsFileIO) {
    console.log("Set your new filter settings:");
    const updatedFilter = await new FilterSettingsCliIO().input();
    if ((await filterSettingsFileIO.save(updatedFilter)) instanceof Error) {
      process.exit(1);
    }
  }

  const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
  await displayCurrentFilter(filterSettingsFileIO);
  await updateFilter(filterSettingsFileIO);
}

async function inputSearchQueryFields() {
  const queryFieldGroup = new QueryFieldGroup({});
  const prompt = new Form({
    name: "queryFieldGroup",
    message: "Find pages with...",
    choices: [
      { name: "queryWords", message: "all these words", initial: "" },
      { name: "exactWords", message: "this exact word or phrase", initial: "" },
      { name: "anyOfTheseWords", message: "any of these words", initial: "" },
      { name: "except", message: "none of these words", initial: "" },
      {
        name: "numbersRangingFrom",
        message: "numbers ranging from",
        initial: "",
      },
      { name: "numbersRangingTo", message: "numbers ranging to", initial: "" },
    ],
  });

  const answer = await prompt.run();

  queryFieldGroup.queryWords = answer.queryWords;
  queryFieldGroup.exactWords = answer.exactWords;
  queryFieldGroup.anyOfTheseWords = answer.anyOfTheseWords;
  queryFieldGroup.except = answer.except;
  queryFieldGroup.numbersRangingFrom = answer.numbersRangingFrom;
  queryFieldGroup.numbersRangingTo = answer.numbersRangingTo;

  console.log(queryFieldGroup);

  return queryFieldGroup;
}

async function setFilter() {
  console.log("Then narrow your results by...");
  return await new FilterSettingsCliIO().input();
}

async function applyDefaultFilter() {
  const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
  const currentFilter = await filterSettingsFileIO.load();
  if (currentFilter instanceof Error) {
    process.exit(1);
  }
  console.log("Applied filter:");
  console.log(currentFilter);

  return currentFilter;
}

async function displayUrl(queryFields, filter, notOpenUrlInBrowser) {
  const urlBuilder = new UrlBuilder();
  const url = urlBuilder.generateGoogleSearchUrl(queryFields, filter);
  if (notOpenUrlInBrowser) {
    console.log("Find pages in the url below:");
    console.log(url);
  } else {
    console.log("Opening the url below in your browser...");
    console.log(url);
    await open(url);
  }
}
