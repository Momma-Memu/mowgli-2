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
    const formData = {};

    if (this.#entityId) {
      formData.id = this.#entityId;
    }

    this.#fields.forEach((fieldDef) => {
      const valueId = fieldDef.field.valueId;
      let value = fieldDef.field.value;
      value = value !== "" ? value : fieldDef.field.fieldEl.value

      if (fieldDef.type === "date") {
        formData[fieldDef.name] = fieldDef.getFormattedValue(value);
      } else if (fieldDef.useValueID && valueId) {
        formData[fieldDef.name] = valueId;
      } else {
        formData[fieldDef.name] = value;
      }
      
      if (fieldDef.hiddenIdField) {
        formData[fieldDef.hiddenIdField.name] = fieldDef.hiddenIdField.field.value;
      }
    });

    

    return formData;
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
    this.#entityId = item.id;


    this.#fields.forEach((fieldDef) => {
      const { field } = fieldDef;
      const value = item[field.name];

      if (value) {
        if (field.type === "select" && typeof value === "object") {
          const entity = Array.isArray(value) ? value[0] : value;
          if (entity) {

            field.valueId = entity.id;
            field.value = entity.name;
          }
        } else if(field.type === "date") {
          field.value = value.split("T")[0];
        } else if (!Array.isArray(value)) {
          field.value = value;
        }
      }

      if (fieldDef.hiddenIdField) {
        fieldDef.hiddenIdField.field.value = item[fieldDef.hiddenIdField.name];
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

  #getValues() {
    const formData = {};

    this.#fields.forEach(({ 
      type, name, getFormattedValue, hiddenIdField, useValueID, field 
    }) => {
      const { value, valueId } = field;

      if (type === "date") {
        formData[name] = getFormattedValue(value);

      } else if (useValueID && valueId) {
        formData[name] = valueId;

      } else if (value || value === false) {
        formData[name] = value;
      }

      if (hiddenIdField) {
        formData[hiddenIdField.name] = hiddenIdField.field.value;
      }
    });
  }
}

customElements.define("mo-form", MoForm);
