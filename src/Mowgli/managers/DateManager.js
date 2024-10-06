import MowgliError from "../error/index";

export default class MowgliDateManager {
  /** 
   * @param {string} [dateString=""] 
   * @throws {MowgliError}
   * @returns {string} 
   */
  toField(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      this.#throw(`The provided date string, "${dateString}", is not a valid Date string format.`);
    } else {
      return date.toLocaleDateString()
    }
  }

  toDb() {

  }

  #throw(description = "") {
    throw new MowgliError("MowgliDateManager", description);
  }
}