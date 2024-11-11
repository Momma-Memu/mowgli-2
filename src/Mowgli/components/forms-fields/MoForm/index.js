import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../../../builders/FieldDefinition";

export default class MoForm extends MoComponent {
  /** @type {FieldDefinition[]}  */
  #fields;

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
    
    this.#fields.forEach(fieldDef => {
      if (fieldDef.useValueID) {
        rawValue[fieldDef.name] = fieldDef.field.valueId;
      } else {
        rawValue[fieldDef.name] = fieldDef.field.value;
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

  /** @param {{}} item */
  patch(item) {
    // const { id } = item;
    const fields = this.#fields.map(field => field.field);
    
    fields.forEach(field => {
      const value = item[field.name];
      field.value = value;
    });
    
    console.log(item, fields);
  }

  /** - Resets each internal MoField to the initial state.  */
  reset() {
    const fields = this.#fields.map(field => field.field);
    
    fields.forEach(field => {
      field.reset();
    });
    
  }
}

customElements.define("mo-form", MoForm);
