// eslint-disable-next-line no-unused-vars
import { FieldType } from "../../enums/KeyCodes";

import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoField extends MoComponent {
  #dirty = this.addInternal("dirty");
  #empty = this.addInternal("empty");
  #valid = this.addInternal("valid");

  #disabled = this.addInternal("disabled");
  #required = this.addInternal("required");


  #name = this.addAttribute("name");
  #label = this.addAttribute("label");
  #placeholder = this.addAttribute("placeholder");
  #type = this.addAttribute("type");
  #halfWidth = this.addInternal("half-width");

  #options = this.addState();
  
  #timeout = this.addTimeout(500);

  #value = this.addState();

  constructor() {
    super(styles, template);
    this.#empty.state = true;
  }
  // static get observedAttributes() {
  //   return ["label", "placeholder", "name", "type"];
  // }

  // ================= Attributes =================

  get name() {
    return this.#name.attribute;
  }

  set name(value) {
    this.#name.attribute = value;
  }

  get label() {
    return this.#label.attribute;
  }

  set label(value) {
    this.#label.attribute = value;
  }

  get placeholder() {
    return this.#placeholder.attribute;
  }

  set placeholder(value) {
    this.#placeholder.attribute = value;
  }

  get halfWidth() {
    return this.#halfWidth.attribute;
  }

  set halfWidth(halfWidth) {
    this.#halfWidth.attribute = halfWidth;
  }

  get type() {
    return this.#type.attribute;
  }

  /** @param {keyof FieldType} type  */
  set type(type) {
    this.#type.attribute = type;
  }

  // ================= Internals ==================

  get required() {
    return this.#required.state;
  }

  set required(value) {
    this.#required.state = value;
  }

  get disabled() {
    return this.#disabled.state;
  }

  set disabled(value) {
    this.#disabled.state = value;
  }

  get dirty() {
    return this.#dirty.state;
  }

  set dirty(value) {
    this.#dirty.state = value;
  }


  get empty() {
    return this.#empty.state;
  }

  set empty(value) {
    this.#empty.state = value;
  }

  get valid() {
    return this.#valid.state;
  }

  set valid(value) {
    this.#valid.state = value;
  }

  // =================== State ===================

  get options() {
    return this.#options.state;
  }

  set options(state) {
    this.#options.state = state;
  }

  get value() {
    return this.#value.state;
  }

  set value(data) {
    this.#value.state = data;
  }

  // ================== Elements ==================

  /** @returns {HTMLLabelElement} */
  get labelEl() {
    return this.getElementById("field-label");
  }

  /** @returns {HTMLInputElement | HTMLSelectElement} */
  get fieldEl() {
    return this.getElementById("field-input");
  }

  // =============== Public Methods ===============

  connectedCallback() {
    this.#createField(this.type);
    this.#updateAttributes();

    if (this.type === "date" || this.type === "select") {
      this.addListener("change", (event) => this.#changeHandler(event), this.fieldEl);
    } else {
      this.addListener("keyup", (event) => this.#changeHandler(event, true), this.fieldEl);
    }
  }

  #updateAttributes() {
    const field = this.fieldEl;
    const label = this.labelEl;

    if (label) {
      this.ariaLabel = this.label;

      label.setAttribute("for", this.name);
      label.innerHTML = this.label;
    }

    if (field) {
      if (this.required) {
        field.setAttribute("required", this.required);
      }

      if (this.disabled) {
        field.setAttribute("disabled", this.required);
      }

      if (this.type !== "select") {
        field.setAttribute("name", this.name);
        field.setAttribute("type", this.type);
      }

      field.setAttribute("placeholder", this.placeholder);
    }
  }

  /**
   * @param {KeyboardEvent} event
   * @param {boolean} timeout
   */
  #changeHandler(event, timeout) {
    event.stopPropagation();
    this.dirty = true;
    this.value = event.target.value;

    if (event.target.value) {
      this.empty = false;
    } else {
      this.empty = true;
    }

    if (timeout) {
      this.#timeout.sleep(() => {
        this.valid = this.#checkValidity();
        this.emitEvent(this.createEvent("field-changed", this.value));
      });
    } else {
      this.valid = this.#checkValidity();
    }
  }
  

  /**
   * - Returns True if this field is valid, else returns false.
   * - Reports the validity of the field to the UI
   * @returns {boolean}
   */
  #checkValidity() {
    // If required, check if field has a value, else this check passes.
    const requiredCheck = this.required ? this.value : true;

    // If value is present, check if it passes the constraints within the validity object.
    const validity = this.value ? this.fieldEl.validity.valid : true;

    // Report the current validity.
    this.fieldEl.reportValidity();

    return requiredCheck && validity;
  }

  #createField() {
    const fieldWrapper = this.getByClass("field-container");
    
    const templateId = this.type === "select" ? this.type : "default";
    const clone = this.buildTemplate(templateId);

    if (fieldWrapper) {
      fieldWrapper.appendChild(clone);
    }

    if (this.type === "select") {
      // this.fieldEl.options = this.options;
      this.#buildOptions()
    }
  }

  #buildOptions() {
    const container = this.shadow.getElementById("field-input");

    if (this.options) {
      this.options.forEach((option) => {
        const item = document.createElement("option");
        item.value = option.id;
        item.innerHTML = option.displayName
        // const item = new MoSelectItem();
        
        // item.valueId = option.id;
        // item.displayName = option.displayName;

        container.appendChild(item);
      });
    }
  }
}

customElements.define("mo-field", MoField);
