import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MowgliObject from "@/Mowgli/objects/index";

export default class MoTable extends MoComponent {
  // #items = [];

  /** @type {MowgliObject} */
  moObject;

  constructor() {
    super(styles, template);
    this.addAttribute("mo-name");
  }

  // get items() {
  //   return this.#items;
  // }

  // set items(items) {
  //   this.#items = items;
  // }

  get form() {
    return this.getElementById("mo-form");
  }

  // static get observedAttributes() {
  // }

  connectedCallback() {
    // console.log(this.items, this.moObject);
    this.form.appendChild(this.moObject.buildForm());
  }
}

customElements.define("mo-table", MoTable);
