// eslint-disable-next-line no-unused-vars
import { FieldType } from "../../enums/KeyCodes";

import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoField extends MoComponent {
  // #change = new CustomEvent('mo-field-change', {
  //   detail: "Input Field Changed Event.",
  //   bubbles: true,
  //   cancelable: false,
  //   composed: true
  // });

  #dirty = this.addInternal("dirty");
  #valid = this.addInternal("valid");

  empty = this.addInternal("empty");
  disabled = this.addInternal("disabled");
  required = this.addInternal("required");

  label = this.addAttribute("label");
  placeholder = this.addAttribute("placeholder");
  name = this.addAttribute("name");
  type = this.addAttribute("type");
  halfWidth = this.addInternal("half-width");

  #timeout;
  #value = null;

  constructor() {
    super(styles, template);
    this.empty.state = true;
  }

  // static get observedAttributes() {
  //   return ["label", "placeholder", "name", "type"];
  // }

  // ================= Attributes =================

  // get halfWidth() {
  //   return this.#halfWidth.attribute;
  // }

  // set halfWidth(halfWidth) {
  //   this.#halfWidth.attribute = halfWidth;
  // }

  // get placeholder() {
  //   return this.ariaPlaceholder;
  // }

  // set placeholder(placeholder) {
  //   this.ariaPlaceholder = placeholder;
  //   this.#placeholder.attribute = placeholder;
  //   this.fieldEl.placeholder = placeholder;
  // }

  // get type() {
  //   return this.#type.attribute;
  // }

  // /** @param {keyof FieldType} type  */
  // set type(type) {
  //   this.#type.attribute = type;
  //   this.fieldEl.setAttribute("type", type);
  // }

  get value() {
    return this.fieldEl.value;
  }

  set value(value) {
    this.fieldEl.value = value;
  }

  // ================== Elements ==================

  /** @returns {HTMLLabelElement} */
  get labelEl() {
    return this.getElementById("field-label");
  }

  /** @returns {HTMLInputElement} */
  get fieldEl() {
    return this.getElementById("field-input");
  }

  // =============== Public Methods ===============

  connectedCallback() {
    this.#updateAttributes();
    const field = this.fieldEl;

    if (this.type === "date") {
      this.addListener("change", (event) => this.#changeHandler(event), field);
    } else {
      this.addListener("keyup", (event) => this.#changeHandler(event, true), field);
    }

    // #addEventListeners() {
    //   if (this.type === "select" || this.type === "multi-select" || this.type === "search-select" || this.type === "date") {
    //     this.field.addEventListener("change", this.#fieldListener);
    //   } else {
    //     this.field.addEventListener("keyup", this.#fieldListener);
    //   }
    // }
  }

  #updateAttributes() {
    const field = this.fieldEl;
    const label = this.labelEl;

    if (label) {
      this.ariaLabel = this.label.attribute;

      label.setAttribute("for", this.name.attribute);
      label.innerHTML = this.label.attribute;
    }

    if (field) {
      if (this.required.state) {
        field.setAttribute("required", this.required.state);
      }

      if (this.disabled.state) {
        field.setAttribute("disabled", this.required.state);
      }

      field.setAttribute("name", this.name.attribute);
      field.setAttribute("type", this.type.attribute);
      field.setAttribute("placeholder", this.placeholder.attribute);
    }
  }

  /**
   * @param {KeyboardEvent} event
   * @param {boolean} timeout
   */
  #changeHandler(event, timeout) {
    event.stopPropagation();

    if (event.target.value) {
      this.empty.state = false;
    } else {
      this.empty.state = true;
    }

    if (timeout) {
      clearTimeout(this.#timeout);

      this.#timeout = setTimeout(() => {
        // TODO: Create the Timeout Class and EventEmitter stuff...
      }, 500);
    } else {
      //
    }
  }

  // get dependentFieldName() {
  //   return this.getAttribute("depentent-field-name");
  // }

  // set dependentFieldName(value) {
  //   this.setAttribute("depentent-field-name", value);
  // }

  // get controllerFieldName() {
  //   return this.getAttribute("controller-field-name");
  // }

  // set controllerFieldName(value) {
  //   this.setAttribute("controller-field-name", value);
  // }

  // /**
  //  * - HTMLELement used for capturing user input values.
  //  * @returns {HTMLInputElement | HTMLSelectElement | MoSearchSelect}
  //  */
  // get field() {
  //   if (this.#field) {
  //     return this.#field;
  //   } else {
  //     const inputEl = this.shadowRoot.querySelector("input");
  //     const selectEl = this.shadowRoot.querySelector("select");
  //     const multiSelectEl = this.shadowRoot.querySelector("mo-multi-select");
  //     const searchSelect = this.shadowRoot.querySelector("mo-search-select");

  //     this.#field = inputEl || selectEl || multiSelectEl || searchSelect;

  //     return this.#field;
  //   }
  // }

  // set field(field) {
  //   this.#field = field;
  // }

  // /**
  //  * - HTMLELement used for capturing user input values.
  //  * @returns {HTMLLabelElement}
  //  */
  // get label() {
  //   if (this.#label) {
  //     return this.#label;
  //   } else {
  //     this.#label = this.shadowRoot.querySelector("label");

  //     return this.#field;
  //   }
  // }

  // set label(label) {
  //   this.#label = label;
  // }

  // attributeChangedCallback(prop, oldVal, newVal) {
  //   if (prop === "type") {
  //     this.#appendFieldTemplate();
  //     this.field.setAttribute("type", this.type);

  //     if ((this.templateType === "select" || this.templateType === "multi-select" || this.templateType === "search-select") && this.options) {
  //       this.#appendSelectOptions();
  //     }
  //   }

  //   if (prop === "name" && this.field && this.label) {
  //     this.field.setAttribute("name", this.name);
  //     this.label.setAttribute("for", this.name);
  //   }

  //   if (prop === "aria-label" && this.label) {
  //     this.label.innerHTML = this.ariaLabel;
  //   }

  //   if (prop === "placeholder" && this.field) {
  //     if (this.templateType === "select") {
  //       this.field.firstElementChild.setAttribute("placeholder", this.placeholder);
  //     }

  //     // if (this.type === "multi-select") {
  //     //   this.field.setAttribute("placeholder", this.placeholder);
  //     // }

  //     this.field.setAttribute("placeholder", this.placeholder);
  //   }

  //   if (prop === "required" && this.field) {
  //     if (this.required === "true") {
  //       this.field.setAttribute("required", this.required);
  //     } else if (this.required === "false") {
  //       this.field.removeAttribute("required");
  //     }
  //   }
  // }

  // connectedCallback() {
  //   this.#addEventListeners();
  // }

  // disconnectedCallback() {
  //   this.#removeEventListeners();
  // }

  // #handleFieldEventTimeout() {
  //   if (this.templateType === "standard" && this.type !== "date") {
  //     clearTimeout(this.#validateTimeout);

  //     this.#validateTimeout = setTimeout(() => {
  //       this.#handleFieldEvent();
  //     }, 400);
  //   } else {
  //     this.#handleFieldEvent();
  //   }
  // }

  // #handleFieldEvent() {
  //   this.value = this.field.value;
  //   this.dirty = true;

  //   this.field.setAttribute("dirty", true);
  //   this.valid = this.field.validity.valid;

  //   this.dispatchEvent(this.#change);
  // }

  // #appendSelectOptions() {
  //   const options = this.options.split(",");

  //   this.field.append(...options.map(el => {
  //     const option = document.createElement("option");
  //     option.setAttribute("id", el);
  //     option.setAttribute("value", el);
  //     option.innerHTML = el;

  //     return option;
  //   }));
  // }

  // #removeEventListeners() {
  //   if (this.type === "select" || this.type === "date") {
  //     this.field.removeEventListener("change", this.#fieldListener);
  //   } else {
  //     this.field.removeEventListener("keyup", this.#fieldListener);
  //   }
  // }

  // #appendFieldTemplate() {
  //   if (this.templateType === "hidden") {
  //     this.shadowRoot.appendChild(this.#hiddenTemplate.content.cloneNode(true))
  //   } else if (this.templateType === "standard") {
  //     this.shadowRoot.appendChild(this.#standardTemplate.content.cloneNode(true));
  //   } else if (this.templateType === "select") {
  //     this.shadowRoot.appendChild(this.#selectTemplate.content.cloneNode(true));
  //   } else if (this.templateType === "multi-select") {
  //     this.shadowRoot.appendChild(this.#multiSelectTemplate.content.cloneNode(true));
  //   } else if (this.templateType === "search-select") {
  //     this.shadowRoot.appendChild(this.#searchSelectTemplate.content.cloneNode(true));
  //   }
  // }
}

customElements.define("mo-field", MoField);
