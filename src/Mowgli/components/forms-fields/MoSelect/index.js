import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

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

  // active = this.addInternal("active");

  constructor() {
    super(styles, template);

    this.setAttribute("tabindex", 0);

    // this.addListener("click", () => this.active.state = !this.active.state);

    // this.addListener("field-changed", (event) => {
    //   event.preventDefault();
      
    //   this.value = event.detail;
    //   // console.log(this.apiRoute, this.value);



    //   // if (this.apiRoute) {
    //   //   this.#fetchOptions();
    //   // }
    // });
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
    this.field.name = this.name;
    this.field.required.state = this.required.state;
    this.field.label.attribute = this.label.attribute;
    this.field.type.attribute = this.type.attribute;
    this.field.placeholder.attribute = this.placeholder.attribute || this.label.attribute;
    this.field.halfWidth.state = this.halfWidth.attribute;
  }

  buildOptions(options) {
    const container = this.getByClass("selection-box");

    const htmlString = options.map((option => {
      return (`<mo-select-item id="${option.id}">${option.displayName}</mo-select-item>`);
    })).join("");

    container.innerHTML = htmlString;
  }
}

customElements.define("mo-select", MoSelect);
