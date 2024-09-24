export default class MoEvent extends CustomEvent {
  constructor(name, data = null) {
    super(name, {
      detail: data,
      bubbles: true,
      cancelable: false,
      composed: true
    });
  }
}