export default class MoSleep {
  /** @type {NodeJS.Timeout | undefined} */
  #timeout;

  /** @type {number} */
  #time;

  /** 
   * @param {number} time - Amount of milliseconds to wait before calling the callback method. 
   */
  constructor(time) {
    this.#time = time;
  }

  sleep(callback) {
    clearTimeout(this.#timeout);

    this.#timeout = setTimeout(() => {
      callback();
    }, this.#time);
  }

  clean() {
    clearTimeout(this.#timeout);

    this.#timeout = null;
    this.#time = null;
  }
}