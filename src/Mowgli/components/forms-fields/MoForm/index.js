import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../../../builders/FieldDefinition";

export default class MoForm extends MoComponent {
  /** @type {FieldDefinition[]}  */
  #fields;

  /** @type {string} */
  #entityId = "";

  constructor() {
    super(styles, template);
  }

  /** @returns {HTMLFormElement} */
  get formEl() {
    return this.shadow.getElementById("form");
  }

  /** @returns {{}} */
  get values() {
    const rawValue = {};

    if (this.#entityId) {
      rawValue.id = this.#entityId;
    }

    this.#fields.forEach((fieldDef) => {
      const { value, valueId } = fieldDef.field;

      if (fieldDef.useValueID && valueId) {
        rawValue[fieldDef.name] = valueId;
      } else if (value || value === false) {
        rawValue[fieldDef.name] = value;
      }

      if (fieldDef.hiddenIdField) {
        rawValue[fieldDef.hiddenIdField.name] = fieldDef.hiddenIdField.field.value;
      }
    });

    return rawValue;
  }

  connectedCallback() {
    // this.getElementsByName("mo-field");
  }

  /** @param {FieldDefinition[]} fields  */
  build(fields) {
    this.#fields = fields;

    this.#fields.forEach((field) => {
      this.shadow.appendChild(field.buildHTML());
    });
  }

  /** @param {Object.<string, any>} item */
  patch(item) {
    const fields = this.#fields.map((field) => field.field);
    this.#entityId = item.id;

    fields.forEach((field) => {
      const entry = item[field.name];

      if (entry) {
        if (field.type === "select" && Array.isArray(entry) && entry.length) {
          const { id, name } = entry[0];
          field.valueId = id;
          field.value = name;
        } else if (field.type !== "select") {
          const value = item[field.name];
          field.value = value;
        }
      }
    });
  }

  /** - Resets each internal MoField to the initial state.  */
  reset() {
    const fields = this.#fields.map((field) => field.field);
    this.#entityId = "";

    fields.forEach((field) => {
      field.reset();
    });
  }
}

customElements.define("mo-form", MoForm);
