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

  /** @type {HTMLTableElement} */
  #table;

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
      console.log(data);
    }

    return [res, data];
  }

  /** @returns {HTMLTableElement} */
  build() {
    this.#table = document.createElement("table");
    this.#table.setAttribute("id", "mo-table");
    this.#table.innerHTML = this.#buildColumns() + this.#buildRecords();


    return this.#table;
  }

  //
  insertRow(record, index = 0) {
    if (this.#table && index >= 0) {
      const siblingRow = this.#table.children[1].children[index];
      siblingRow.insertAdjacentHTML("beforebegin", this.#buildRecord(record));
    } else {
      // TODO: throw helpful error...
    }
  }

  refreshRows(records = this.#records) {
    if (this.#records !== records) {
      this.#records = records;
    }

    if (this.#table) {
      const tbody = this.#table.children[1];
      tbody.innerHTML = this.#buildRecords();
    }
  }

  #buildColumns() {
    const cells = this.#fields.map(field => this.#buildCell(field.displayName, true)).join("") + this.#buildCell("Created", true);
    return `<thead>${this.#buildRow(cells)}</thead>`;
  }

  #buildRecords() {
    const keys = this.#getColNames();

    // Create each row as a long HTML string.
    const rows = this.#records.map(record => this.#buildRecord(record, keys)).join("");

    return `<tbody id="mo-table-body">${rows}</tbody>`;
  }

  #buildRecord(record, keys = this.#getColNames()) {
    // console.log(record)
    // Create a long HTML string for each column value in this row.
    const cells = keys.map(key => {
      const fieldDef = this.#fields.find(field => field.name === key);
      const value = fieldDef.getFormattedValue(record[key], fieldDef.name);
      
      return this.#buildCell(value, false, key);
    }).join("");
    
    // Next create the HTML Row string, combined with all the data cells and  date cell.
    return this.#buildRow(cells + this.#buildCreateDateCell(record.createdAt), record.id);
  }

  /** 
   * @param {HTMLTableCellElement[]} cells 
   * @param {string} [id=""] 
   * @param {string} [selector=""] 
  */
  #buildRow(cells, id = "") {
    const row = document.createElement("tr");
    row.append(...cells);
    
    return id ? `<tr id="record-${id}">${cells}</tr>` : `<tr>${cells}</tr>`;
  }

  /**
   * @param {string} content - Content to display within the innerHTML of the returned element.
   * @param {boolean} isCol - If true, this method returns a <th> element, <td> if false, with the appropriate attributes.
   * @param {string} name - If true, this method returns a <th> element, <td> if false, with the appropriate attributes.
  */
  #buildCell(content, isCol = false, name = "") {
    const type = isCol ? "th" : "td";
    const scope = isCol ? "col" : "row";
    const selector = name ? `class="${name}"` : "";

    return `<${type} ${selector} scope="${scope}">${content}</${type}>`;
  }

  #getColNames() {
    return this.#fields.map(field => field.name);
  }

  #buildCreateDateCell(date) {
    return this.#buildCell(new Date(date).toLocaleDateString());
  }
}