import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSwitch extends MoComponent {
  #value = this.addInternal("active");

  constructor() {
    super(styles, template);
  }

  /** @returns {boolean} */
  get value() {
    return this.#value.state;
  }

  /** @param {boolean} state  */
  set value(state) {
    this.#value.state = state;
  }

  connectedCallback() {
    const btn = this.getElementById("switch-field");

    this.addListener("click", () => this.#handleChange(), btn);
    this.addListener("keyup", (event) => this.keyUpHandler(event, "Enter"), btn);
  }

  #handleChange() {
    this.value = !this.value;
    this.emitEvent(this.createEvent("change", this.value));
  }
}

customElements.define("mo-switch", MoSwitch);
