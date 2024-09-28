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

  get modalBody() {
    return this.getElementById("modal-body");
  }

  // static get observedAttributes() {
  // }

  connectedCallback() {
    if (this.moObject) {
      this.form = this.moObject.buildForm();
      this.modalBody.appendChild(this.form);
    }
  }
}

customElements.define("mo-table", MoTable);
