import MowgliError from "../../error/index";

/** - Manages a client side persistent cache through the SessionStorage API.*/
export default class MowgliCache {
  #key;
  #errorName = "Cache";

  /** @param {string} key - Key to reference the stored data. */
  constructor(key) {
    this.#key = key;
  }

  /** - Current value of the cache.*/
  get cache() {
    return this.#getSessionStorage();
  }

  set cache(value) {
    this.#setSessionStorage(value);
  }

  /**
   * - Returns stored data from a specified MowgliCache instance.
   * @param {string} key - Specifies which MowgliCache the data should be retrieved from. */
  getCacheByKey(key) {
    return sessionStorage.getItem(key);
  }

  /** - Wipes all stored data within the SessionStorage from the MowgliCache instance. */
  destroyCache() {
    sessionStorage.removeItem(this.#key);
  }

  #getSessionStorage() {
    return this.#parse(sessionStorage.getItem(this.#key));
  }

  #setSessionStorage(newCacheData) {
    sessionStorage.setItem(this.#key, this.#stringify(newCacheData));
  }

  #parse(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch {
      this.#logError(jsonString, "parse");
      return null;
    }
  }

  #stringify(data) {
    try {
      return JSON.stringify(data);
    } catch {
      this.#logError(data, "stringify");
    }
  }

  #logError(value, verb) {
    console.error(
      new MowgliError(
        this.#errorName,
        `JSON canonot ${verb} value "${value}", within the ${this.#key} MowgliCache.`
      )
    );
  }
}
