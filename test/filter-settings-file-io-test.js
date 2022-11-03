import * as assert from "node:assert";
import FilterSettingsFileIO from "../lib/filter-settings-file-io.js";
import Filter from "../lib/filter.js";
import { readFile } from "node:fs/promises";

const DEFAULT_FILTER_PATH = "../config/default-filter.json";

describe("constructor of FilterSettingsFileIO", function () {
  it("sets fileUrl property with a given argument", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    const expected = new URL(DEFAULT_FILTER_PATH, import.meta.url);
    const result = filterSettingsFileIO.fileUrl;

    assert.deepEqual(result, expected);
  });

  it("throws an error if it has no argument.", async () => {
    let e = "";
    try {
      const _ = new FilterSettingsFileIO();
      console.log(_);
    } catch (error) {
      e = error;
    } finally {
      assert.strictEqual(e.message, "The constructor requires a path argument");
    }
  });
});

describe("the fileUrl setter of FilterSettingsFileIO", function () {
  it("can change file url from the default one", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    const expected = new URL("../lib/new_path", import.meta.url);
    filterSettingsFileIO.setFileUrl("new_path");
    const result = filterSettingsFileIO.fileUrl;

    assert.deepEqual(result, expected);
  });
});

describe("the input function of FilterSettingsFileIO", function () {
  it("loads the json file specified the fileURL property and create a Filter instance with the data", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    const expected = new Filter({
      language: "English",
      region: "United_Kingdom",
      lastUpdate: "pastYear",
      siteOrDomain: "wikipedia.org",
      termsAppearing: "inTheTextOfThePage",
      safeSearch: "hideExplicitResults",
      fileType: "pdf",
      usageRights: "freeToUseOrShare",
    });
    filterSettingsFileIO.setFileUrl("../test/fixtures/load-test.json");
    const result = await filterSettingsFileIO.load();

    assert.deepEqual(result, expected);
  });

  it("returns an error if it fails to read the config file", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    filterSettingsFileIO.setFileUrl("../test/fixtures/non-existent-file");
    const result = await filterSettingsFileIO.load();
    assert.ok(result instanceof Error);
  });

  it("returns an error if the loaded file is empty", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    filterSettingsFileIO.setFileUrl("../test/fixtures/load-test-empty.json");
    const result = await filterSettingsFileIO.load();
    assert.ok(result instanceof Error);
  });

  it("returns an error if it receives a file not in json format", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    filterSettingsFileIO.setFileUrl("../test/fixtures/non-json.txt");
    const result = await filterSettingsFileIO.load();
    assert.ok(result instanceof Error);
  });
});

describe("the output function of FilterSettingsFileIO", function () {
  it("writes the filter data in the json file at the URL specified in fileURL property", async () => {
    const SAVE_FILE_PATH = "../test/fixtures/save-test.json";
    const EXPECTED_JSON = {
      language: "English",
      region: "United_Kingdom",
      lastUpdate: "pastYear",
      siteOrDomain: "wikipedia.org",
      termsAppearing: "inTheTextOfThePage",
      safeSearch: "hideExplicitResults",
      fileType: "pdf",
      usageRights: "freeToUseOrShare",
    };

    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);

    const filter = new Filter(EXPECTED_JSON);
    filterSettingsFileIO.setFileUrl(SAVE_FILE_PATH);
    await filterSettingsFileIO.save(filter);

    const expected = EXPECTED_JSON;
    const result = JSON.parse(
      await readFile(new URL(SAVE_FILE_PATH, import.meta.url))
    );
    assert.deepEqual(result, expected);
  });

  it("returns error if it receives an instance that is not of Filter", async () => {
    const filterSettingsFileIO = new FilterSettingsFileIO(DEFAULT_FILTER_PATH);
    const number = 1;

    filterSettingsFileIO.setFileUrl("../test/fixtures/save-error-test.json");
    const result = await filterSettingsFileIO.save(number);

    assert.ok(result instanceof Error);
  });
});
