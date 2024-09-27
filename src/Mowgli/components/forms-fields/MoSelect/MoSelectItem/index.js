import MoComponent from "../../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSelectItem extends MoComponent {
  #active = this.addInternal("active");
  #valueId = this.addAttribute("valueId");
  #displayName = this.addAttribute("displayName");

  constructor() {
    super(styles, template);

    // this.addListener("click", () => this.#updateState());
  }

  get nameEl() {
    return this.shadow.getElementById("display-name");
  }

  get valueId() {
    return this.#valueId;
  }

  set valueId(value) {
    this.#valueId = value;
  }

  get displayName() {
    return this.#displayName;
  }

  set displayName(value) {
    this.#displayName = value;

    this.nameEl.innerHTML = value;
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
