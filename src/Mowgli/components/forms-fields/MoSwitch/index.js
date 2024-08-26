import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSwitch extends MoComponent {
  #value = false;

  constructor() {
    super(styles, template);

    this.active = this.addInternal("active");
    this.label = this.addAttribute("mo-label");
  }

  get value() {
    return this.#value;
  }

  set value(state) {
    this.#value = state;
  }

  connectedCallback() {
    const btn = this.getElementById("switch-field");
    this.addListener("click", () => (this.active.state = !this.active.state), btn);
    this.addListener("keyup", (event) => this.keyUpHandler(event, "Enter"), btn);
  }
}

customElements.define("mo-switch", MoSwitch);
