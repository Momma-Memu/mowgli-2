// @ts-check


export default class MoListener {
  /** 
   * @param {HTMLElement} element
   * @param {keyof HTMLElementEventMap} type
   * @param {EventListenerOrEventListenerObject} listener
   */
  constructor(element, type, listener) {
    this.element = element;
    this.type = type;
    this.listener = listener;
  }

  clean() {
    this.element.removeEventListener(this.type, this.listener);
  }
}
