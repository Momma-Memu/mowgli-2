import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../../../builders/FieldDefinition";

// eslint-disable-next-line no-unused-vars
import MoField from "../MoField/index";

export default class MoForm extends MoComponent {
  constructor() {
    super(styles, template);
  }

  /** @returns {HTMLFormElement} */
  get formEl() {
    return this.shadow.getElementById("form");
  }

  /** @returns {MoField[]} */
  get fields() {
    return this.getElementsByName("mo-field");
  }

  /** @returns {{}} */
  get values() {
    const rawValue = {};
    
    this.fields.forEach(field => rawValue[field.name] = field.value);

    return rawValue;
  }

  connectedCallback() {
    // this.getElementsByName("mo-field");
  }

  /** @param {FieldDefinition[]} fields  */
  build(fields) {
    fields.forEach((field) => {
      this.shadow.appendChild(field.buildHTML());
    });
  }

  /** - Resets each internal MoField to the initial state.  */
  reset() {
    // const fields = this.getElementsByName("mo-field");
    // console.log(fields);
  }
}

customElements.define("mo-form", MoForm);
