import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MowgliObject from "../../../objects/index";

// eslint-disable-next-line no-unused-vars
import MoModal from "@/Mowgli/components/modal/MoModal/index";

// eslint-disable-next-line no-unused-vars
import MoForm from "../../forms-fields/MoForm";


export default class MoTable extends MoComponent {
  #mobject = this.addState();
  #editingId = this.addState("");
  #records = this.addState([]);
  #timeout = this.addTimeout(400);
  #form = this.addState();

  constructor() {
    super(styles, template);

    this.addListener("closed", this.#resetForm);
    this.addListener("submit", this.#submitForm);
  }

  /** @type {MowgliObject} */
  get mobject() {
    return this.#mobject.state;
  }

  set mobject(mobject) {
    if (this.#mobject.state) {
      this.tableContainer.innerHTML = "";
    }
    
    this.#mobject.state = mobject;
    this.form = this.mobject.buildForm();
    this.#buildTable(mobject);
  }

  /** @type {MoForm} */
  get form () {
    return this.#form.state;
  }

  set form (form) {
    if (this.#form.state) {
      this.modalBody.innerHTML = "";
    }

    this.#form.state = form;
    this.modalBody.appendChild(this.#form.state);
    this.modal.title = `Create ${this.mobject.name}`;
  }

  /** @type {any[]} */
  get records() {
    return this.#records;
  }

  set records(records) {
    this.#records.state = records;
  }

  /** @type {MoModal} */
  get modal() {
    return this.getBySearch("mo-modal");
  }

  get modalBody() {
    return this.getElementById("modal-body");
  }

  get tableContainer() {
    return this.getByClass("table-container");
  }

  get moSearch() {
    return this.getElementById("mo-search");
  }

  connectedCallback() {
    this.shadow.appendChild(this.#getFooter());

    this.addListener("search-changed", (event) => this.#handleSearch(event), this.moSearch);
    this.addListener("submit", (event) => this.#submitForm(event), this.getElementById("table-modal"));
  }
  
  #getFooter() {
    const supportTxt = "Columns may be hidden to support your device. This is configurable by your administrator.";

    const foot = document.createElement("div");
    const count = this.mobject.state ? this.mobject.state.length : 0;

    foot.setAttribute("id", "foot");
    foot.innerHTML = `<div>${supportTxt}</div><div id="results-count">Results: ${count}</div>`;

    return foot;
  }

  #addEditListeners() {
    const rows = this.getAllBySearch("tr[id]");

    rows.forEach(row => {
      this.addListener("click", () => this.#edit(row), row);
    });
  }

  /** @param {HTMLTableRowElement} row  */
  #edit(row) {
    this.#editingId = row.getAttribute("id").split("-")[1];
    const item = this.mobject.getRecordById(this.#editingId);

    const title = item.name ? item.name : this.mobject.name;
    this.modal.title = `Edit ${title}`;

    this.form.patch(item);
    this.modal.open();
  }

  /** @param {Object.<string, any>} record  */
  #updateRow(record) {
    const row = this.getElementById(`record-${record.id}`);
    const columns = Object.values(row.childNodes);
    columns.forEach(col => {
      const name = col.getAttribute("class");
      const fieldDef = this.mobject.fields.find(field => field.name === name);

      const value = fieldDef ? fieldDef.getFormattedValue(record[name]) : "";
      if (col.innerHTML !== value && fieldDef) {
        col.innerHTML = value;
      }
    });
  }


  #setResultCount(count = 0) {
    const countEl = this.getElementById("results-count");
    countEl.innerHTML = `Results: ${count}`;
  }

  #resetForm() {
    this.#timeout.sleep(() => {
      this.form.reset();
      this.modal.title = `Create ${this.mobject.name}`;
    });
  }

  /** @param {Event} event  */
  async #submitForm(event) {
    event.stopPropagation();
    const formData = this.form.values;
    

    if (formData.id) {
      const [res, data] = await this.mobject.put("", formData);

      if (res.ok) {
        this.#updateRow(data);
      }
    } else {
      const [res, data] = await this.mobject.post("", formData);
      if (res.ok) {
        this.mobject.listManager.insertRow(data);
        this.#setResultCount(this.mobject.state.length);
      }
    }
  }

  async #handleSearch({ detail }) {
    const [res] = await this.mobject.get(detail);

    if (res.ok) {
      this.mobject.listManager.refreshRows(this.mobject.state);
      this.#setResultCount(this.mobject.state.length);
    }
  }

  async #buildTable() {
    if (!this.mobject.state) {
      await this.mobject.get();
    }

    this.tableContainer.appendChild(this.mobject.buildListTable());
    this.#addEditListeners();
    this.#setResultCount(this.mobject.state.length);
  }
}

customElements.define("mo-table", MoTable);
