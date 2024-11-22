import MowgliError from "../error/index";

export default class MowgliDateManager {
  /** 
   * @param {string} [dateString=""] 
   * @throws {MowgliError}
   * @returns {string} 
   */
  toField(dateString) {
    const date = new Date(dateString);
    date.setMinutes(date.getTimezoneOffset());

    if (isNaN(date)) {
      this.#throw(`The provided date string, "${dateString}", is not a valid Date string format.`);
    } else {
      return date.toLocaleDateString()
    }
  }

  toDb(dateString) {
    const date = new Date(dateString);
    date.setMinutes(date.getTimezoneOffset());

    return date.toLocaleDateString();
  }

  /** 
   * @param {string} [dateString=""] 
   * @throws {MowgliError}
   * @returns {string} 
   */
  toDateTimeString(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      this.#throw(`The provided date string, "${dateString}", is not a valid Date string format.`);
    } else {
      return date.toLocaleString()
    }
  }

  #throw(description = "") {
    throw new MowgliError("MowgliDateManager", description);
  }
}