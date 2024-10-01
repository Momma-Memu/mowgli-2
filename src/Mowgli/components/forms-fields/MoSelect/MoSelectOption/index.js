import MoComponent from "../../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSelectOption extends MoComponent {
  #value = this.addAttribute("value");
  #valueID = this.addAttribute("valueID");
  
  constructor() {
    super(styles, template);
  }

  connectedCallback() {
    this.addListener("click", (event) => this.#click(event));
  }

  get optionData() {
    return {
      id: this.value,
      value: this.valueID,
    }
  }

  get value() {
    return this.#value.attribute;
  }

  set value(value) {
    this.#value.attribute = value;
  }

  get valueID() {
    return this.#valueID.attribute;
  }

  set valueID(valueID) {
    this.#valueID.attribute = valueID;
  }

  /** @param {Event} event */
  #click(event) {
    event.stopPropagation();
    this.emitEvent(this.createEvent("mo-select", this.optionData));
  }
}
customElements.define("mo-select-option", MoSelectOption);
