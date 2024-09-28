import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MoSelectedItem from "./MoSelectedItem/index";
// import { FieldType } from "../../enums/KeyCodes";

import MoSelectItem from "./MoSelectItem/index";

export default class MoSelect extends MoComponent {
  // #value = "";
  // #valueId = "";

  // apiRoute = "";
  // options = [];

  // #allowMulti = this.addInternal("mo-multi");
  // #search = this.addInternal("mo-search");

  // #dirty = this.addInternal("dirty");
  // #valid = this.addInternal("valid");

  // empty = this.addInternal("empty");
  // disabled = this.addInternal("disabled");

  // required = this.addInternal("required");

  // label = this.addAttribute("label");
  // placeholder = this.addAttribute("placeholder");
  // #name = this.addAttribute("name");
  // type = this.addAttribute("type");
  // halfWidth = this.addInternal("half-width");

  #options = this.addState();
  // #selected = this.addState([]);

  constructor() {
    super(styles, template);

    // this.setAttribute("tabindex", 0);
    this.addListener("mo-item-selected", (event) => this.#updateOptions(event));
  }

  get options() {
    return this.#options.state;
  }

  set options(value) {
    this.#options.state = value;
    this.#buildOptions();
  }

  // get name() {
  //   return this.#name.attribute;
  // }

  // set name(value) {
  //   this.#name.attribute = value;
  // }

  // get field() {
  //   return this.getElementById("mo-search-field");
  // }

  // get value() {
  //   return this.#value;
  // }

  // set value(value) {
  //   this.#value = value;
  // }

  // get valueId() {
  //   return this.#valueId;
  // }

  // set valueId(valueId) {
  //   this.#valueId = valueId;
  // }

  // get allowMulti() {
  //   return this.#allowMulti.state;
  // }

  // set allowMulti(state) {
  //   this.#allowMulti.state = state;
  // }

  // get search() {
  //   return this.#search.state;
  // }

  // set search(state) {
  //   this.#search.state = state;
  // }

  // connectedCallback() {
  //   console.log(this.options);
  // }

  #buildOptions() {
    const container = this.shadow.getElementById("options");

    if (this.options) {
      this.options.forEach((option) => {
        const item = new MoSelectItem();
        
        item.valueId = option.id;
        item.displayName = option.displayName;

        container.appendChild(item);
      });
    }
  }

  /** @param {CustomEvent} event */
  #updateOptions(event) {
    const { id, displayName, state } = event.detail;
    console.log(id, displayName, state);

    if (state) {
      this.#appendSelectedItem(id, displayName);
    }
  }

  //
  #appendSelectedItem(id, displayName) {
    const selected = this.getByClass("selected-items");
    const item = new MoSelectedItem();

    item.valueId = id;
    item.displayName = displayName;

    selected.appendChild(item);
  }
}

customElements.define("mo-select", MoSelect);
