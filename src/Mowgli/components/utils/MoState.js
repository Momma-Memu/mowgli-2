// @ts-check

export default class MoState {
  #state;
  #callback;

  /**
   * @param {*} [data=null]
   * @param {null | function} [callback=null]
   */
  constructor(data = null, callback = null) {
    this.#state = data;
    this.#callback = callback;
  }

  /** @returns {any} */
  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;

    if (this.#callback && typeof this.#callback === "function") {
      this.#callback();
    }
  }

  clean() {
    this.state = null;
    this.#callback = null;
  }
}
