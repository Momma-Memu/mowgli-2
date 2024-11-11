import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MowgliObject from "@/Mowgli/objects/index";

export default class MoTable extends MoComponent {
  #mobject = this.addState();
  #records = this.addState([]);

  constructor() {
    super(styles, template);
  }

  /** @type {MowgliObject} */
  get mobject() {
    return this.#mobject.state;
  }

  set mobject(mobject) {
    this.#mobject.state = mobject;
  }

  /** @type {any[]} */
  get records() {
    return this.#records;
  }

  set records(records) {
    this.#records.state = records;
  }

  get modalBody() {
    return this.getElementById("modal-body");
  }

  get tableContainer() {
    return this.getByClass("table-container");
  }

  connectedCallback() {
    if (this.mobject && this.getElementById("table-modal")) {
      this.form = this.mobject.buildForm();
      this.modalBody.appendChild(this.form);

      this.#init();
    }

    this.addListener("submit", () => this.#createNew(), this.getElementById("table-modal"));
  }
  
  build() {
    this.tableContainer.appendChild(this.mobject.buildListTable());
    this.shadow.getElementById("head-title-subtext").innerHTML = this.#getSubHeader();

    this.shadow.appendChild(this.#getFooter());
  }

  #init() {
    if (this.mobject.state) {
      this.build();
    } else {
      this.#fetch();
    }
  }

  #getSubHeader() {
    return this.mobject.description;
  }

  #getFooter() {
    const supportTxt = "Columns may be hidden to support your device. This is configurable by your administrator.";
    const results = `Results: ${this.mobject.listManager.records.length}`;

    const footerDiv = document.createElement("div");
    footerDiv.setAttribute("id", "foot");
    footerDiv.innerHTML = `<div>${supportTxt}</div><div>${results}</div>`;

    return footerDiv
  }

  #createNew() {
    console.log(this.form.values);
    this.mobject.post("", this.form.values);
  }

  async #fetch() {
    await this.mobject.get();
    this.build();
  }
}

customElements.define("mo-table", MoTable);
