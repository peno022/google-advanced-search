import enquirer from "enquirer";
import * as operators from "./operators.js";
import Filter from "./filter.js";

const { AutoComplete, Select, Input } = enquirer;
const OPERATORS = operators.OPERATORS;

export default class FilterSettingsCliIO {
  async input() {
    const filter = new Filter({});
    filter.language = await this.#inputAutoComplete("language", "language");
    filter.region = await this.#inputAutoComplete("region", "region");
    filter.siteOrDomain = await this.#typeIn(
      "site or domain",
      "'Search one site (like wikipedia.org ) or limit your results to a domain like .edu, .org or .gov'"
    );
    filter.lastUpdate = await this.#selectFromList("lastUpdate", "last update");
    filter.termsAppearing = await this.#selectFromList(
      "termsAppearing",
      "terms appearing"
    );
    filter.safeSearch = await this.#selectFromList(
      "safeSearch",
      "safe search (whether to filter sexually explicit content)"
    );
    filter.fileType = await this.#selectFromList("fileType", "file type");
    filter.usageRights = await this.#selectFromList(
      "usageRights",
      "usage rights"
    );

    return filter;
  }

  async #inputAutoComplete(name, message) {
    const prompt = new AutoComplete({
      name,
      message,
      limit: 10,
      initial: 0,
      choices: Object.keys(OPERATORS[name]),
    });
    return await prompt.run();
  }

  async #selectFromList(name, message) {
    const prompt = new Select({
      name,
      message,
      choices: Object.keys(OPERATORS[name]),
    });
    return await prompt.run();
  }

  async #typeIn(message, hint) {
    const prompt = new Input({
      message,
      hint,
    });
    return await prompt.run();
  }
}
