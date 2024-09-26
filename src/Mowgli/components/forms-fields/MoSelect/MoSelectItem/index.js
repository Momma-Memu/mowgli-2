import MoComponent from "../../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSelectItem extends MoComponent {
  #active = this.addInternal("active");

  constructor() {
    super(styles, template);

    this.addListener("click", () => this.#updateState());
  }

  get active() {
    return this.#active.state;
  }

  set active(value) {
    this.#active.state = value;
  }

  #updateState() {

    this.active = !this.active;
  }
}
customElements.define("mo-select-item", MoSelectItem);
