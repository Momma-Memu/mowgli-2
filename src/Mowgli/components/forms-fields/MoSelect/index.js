import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
// import { FieldType } from "../../enums/KeyCodes";

import MoSelectItem from "./MoSelectItem/index";

export default class MoSelect extends MoComponent {
  #value = "";
  #valueId = "";

  apiRoute = "";
  options = [];

  #multi = this.addInternal("mo-multi");
  #search = this.addInternal("mo-search");

  // #dirty = this.addInternal("dirty");
  // #valid = this.addInternal("valid");

  // empty = this.addInternal("empty");
  // disabled = this.addInternal("disabled");

  required = this.addInternal("required");

  label = this.addAttribute("label");
  placeholder = this.addAttribute("placeholder");
  #name = this.addAttribute("name");
  type = this.addAttribute("type");
  halfWidth = this.addInternal("half-width");

  constructor() {
    super(styles, template);

    this.setAttribute("tabindex", 0);
  }

  get name() {
    return this.#name.attribute;
  }

  set name(value) {
    this.#name.attribute = value;
  }

  get field() {
    return this.getElementById("mo-search-field");
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get valueId() {
    return this.#valueId;
  }

  set valueId(valueId) {
    this.#valueId = valueId;
  }

  // /** @type {keyof FieldType} code */
  // get type() {
  //   return this.#type;
  // }

  get multi() {
    return this.#multi.state;
  }

  set multi(state) {
    this.#multi.state = state;
  }

  get search() {
    return this.#search.state;
  }

  set search(state) {
    this.#search.state = state;
  }

  connectedCallback() {
    // if (this.type === "")

    // this.field.name = this.name;
    // this.field.required.state = this.required.state;
    // this.field.label.attribute = this.label.attribute;
    // this.field.type.attribute = this.type.attribute;
    // this.field.placeholder.attribute = this.placeholder.attribute || this.label.attribute;
    // this.field.halfWidth.state = this.halfWidth.attribute;

    // console.log(this.options, this.label.attribute, this.placeholder.attribute)
  }

  buildOptions(options) {
    this.options = options;

    const container = this.shadow.getElementById("options");

    if (this.options) {
      this.options.forEach((option) => {
        const item = new MoSelectItem();
        item.setAttribute("id", option.id);
        item.displayName = option.displayName;
  
        container.appendChild(item);
      });

    }
  }
}

customElements.define("mo-select", MoSelect);
