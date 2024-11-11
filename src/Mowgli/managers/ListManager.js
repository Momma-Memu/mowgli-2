import MowgliAPI from "../API/index";
// eslint-disable-next-line no-unused-vars
import MoTable from "../components/tables/MoTable/index";
// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";


export default class ListManager {
  /** @type {MowgliAPI} */
  #mowgliAPI;

  /** @type {string} */
  #name;

  /** @type {FieldDefinition[]} */
  #fields = [];

  /** @type {Object.<string, any>[]} */
  #records = [];

  /**
   * @param {string} name
   * @param {FieldDefinition[]} fields
   * @param 
  */
  constructor(name = "", fields = [], apiRoute = "") {
    this.#name = name;
    this.#fields = fields;
    
    if (apiRoute) {
      this.#mowgliAPI = new MowgliAPI(apiRoute);
    }
  }

  get entityName() {
    return this.#name;
  }

  get records() {
    return this.#records;
  }

  set records(records) {
    this.#records = records;
  }

  get footNote() {
    return `Results: ${this.records.length}`;
  }

  async fetch(queryParams = "") {
    const [res, data] = await this.#mowgliAPI.GET(queryParams);

    if (res.ok) {
      this.#records = data;
    }

    return [res, data];
  }

  /** @returns {HTMLTableElement} */
  build() {
    const table = document.createElement("table");
    table.setAttribute("id", "mo-table");
    table.innerHTML = this.#buildColumns() + this.#buildRecords();


    return table;
  }

  #buildColumns() {
    const cells = this.#fields.map(field => this.#buildCell(field.displayName, true)).join("");
    return `<thead>${this.#buildRow(cells)}</thead>`;
  }

  #buildRecords() {
    const keys = this.#getColNames();

    const rows = this.#records.map(record => {

      const row = this.#buildRow(keys.map(key => {

        const fieldDef = this.#fields.find(field => field.name === key);
        const value = fieldDef.getFormattedValue(record[key]);
        
        return this.#buildCell(value);
      }).join(""), record.id);

      return row;
    }).join("");

    return `<tbody id="mo-table-body">${rows}</tbody>`;
  }

  /** 
   * @param {HTMLTableCellElement[]} cells 
   * @param {string} [id=""] 
  */
  #buildRow(cells, id = "") {
    const row = document.createElement("tr");
    row.append(...cells);
    
    return id ? `<tr id="${id}">${cells}</tr>` : `<tr>${cells}</tr>`;
  }

  /**
   * @param {string} content - Content to display within the innerHTML of the returned element.
   * @param {boolean} isCol - If true, this method returns a <th> element, <td> if false, with the appropriate attributes.
  */
  #buildCell(content, isCol = false) {
    const type = isCol ? "th" : "td";
    const scope = isCol ? "col" : "row";

    return `<${type} scope="${scope}">${content}</${type}>`;
  }

  #getColNames() {
    return this.#fields.map(field => field.name);
  }
}