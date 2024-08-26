export default class MowgliEvent extends CustomEvent {
  /**
   * @param {string} type
   * @param {*} data
   */
  constructor(type, data) {
    super(type, {
      detail: data,
      bubbles: true,
      composed: true
    });
  }

  dispatch() {
    dispatchEvent(this);
  }
}
