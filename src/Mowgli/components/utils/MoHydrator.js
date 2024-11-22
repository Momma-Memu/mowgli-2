import MoListener from "./MoListener";

export default class MoHydrator {

  /** @type {MoListener} */
  #listener;

  /** @type {HTMLElement} */
  #target;

  /** @type {string} */
  #trigger;

  /** 
   * @param {HTMLElement} target 
   * @param {string} trigger
  */
  constructor(target, trigger) {
    this.#target = target;
    this.#trigger = trigger;

    this.#listener = new MoListener(target, this.#trigger, this.handler);
    target.addEventListener(this.#trigger, this.handler);
}


  /** @param {Event} */
  handler(event) {
    console.log(event, this.#target, this.#target)
  }

  clean() {
    this.#listener.clean();
    
    this.#listener = null;
    this.#target = null;
    this.#trigger = null;
  }
}
