import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../../../builders/FieldDefinition";

export default class MoForm extends MoComponent {
  constructor() {
    super(styles, template);
  }

  get formEl() {
    return this.shadow.getElementById("mo-form");
  }

  connectedCallback() {
    console.log("HI!", this.formEl);
  }

  /** @param {FieldDefinition[]} fields  */
  build(fields) {
    fields.forEach((field) => {
      this.shadow.appendChild(field.buildHTML());
    });
  }
}

customElements.define("mo-form", MoForm);
