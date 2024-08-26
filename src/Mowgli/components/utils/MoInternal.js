// @ts-check

export default class MoInternal {
  #name;
  #internals;

  /** 
   * @param {string} name
   * @param {ElementInternals} internals
   */
  constructor(name, internals) {
    this.#name = name;
    this.#internals = internals;
  }

  
  get state () {
    return this.#internals.states.has(this.#name);
  }

  set state(value) {
    if (value) {
      this.#internals.states.add(this.#name);
    } else {
      this.#internals.states.delete(this.#name);
    }
  }

  get internals() {
    return this.#internals;
  }
}