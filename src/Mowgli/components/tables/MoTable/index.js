import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MowgliObject from "@/Mowgli/objects/index";

export default class MoTable extends MoComponent {
  
  /** @type {MowgliObject} */
  moObject;
  #records = this.addState([]);

  constructor() {
    super(styles, template);
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
    if (this.moObject) {
      this.form = this.moObject.buildForm();
      this.modalBody.appendChild(this.form);

      this.build();
    }

    this.addListener("submit", () => this.#createNew(), this.getElementById("table-modal"));
  }
  
  build() {
    this.tableContainer.appendChild(this.moObject.buildListTable());
    this.shadow.getElementById("head-title-subtext").innerHTML = this.#getSubHeader();

    this.shadow.appendChild(this.#getFooter());
  }

  #getSubHeader() {
    return (`
      Click "Create", to make your new ${this.moObject.name}. Select any ${this.moObject.name} from the list below to edit or remove it.
    `);
  }

  #getFooter() {
    const supportTxt = "Columns may be hidden to support your device. This is configurable by your administrator.";
    const results = `Results: ${this.moObject.listManager.records.length}`;

    const footerDiv = document.createElement("div");
    footerDiv.setAttribute("id", "foot");
    footerDiv.innerHTML = `<div>${supportTxt}</div><div>${results}</div>`;

    return footerDiv
  }

  #createNew() {
    console.log(this.form.values);
    this.moObject.post("", this.form.values);
  }
}

customElements.define("mo-table", MoTable);
