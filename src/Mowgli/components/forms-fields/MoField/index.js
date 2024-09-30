// eslint-disable-next-line no-unused-vars
import MowgliAPI from "@/Mowgli/API/index";
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
  #halfWidth = this.addInternal("half-width");


  #name = this.addAttribute("name");
  #label = this.addAttribute("label");
  #placeholder = this.addAttribute("placeholder");
  #type = this.addAttribute("type");
  #apiRoute = this.addAttribute("api-route");

  /** @type {MowgliAPI} */
  #apiManager;
  #options = this.addState();
  #timeout = this.addTimeout(500);
  #value = this.addState();
  #apiParams = this.addState("");
  #selectedData = this.addState({ id: "", value: "" });

  /** @type {function | undefined} */
  symbioticCallback;

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

  get halfWidth() {
    return this.#halfWidth.state;
  }

  set halfWidth(halfWidth) {
    this.#halfWidth.state = halfWidth;
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

  get apiRoute() {
    return this.#apiRoute.state;
  }

  set apiRoute(data) {
    this.#apiRoute.state = data || "";
    this.#apiManager = new MowgliAPI(`${this.apiRoute}`);
  }

  get apiParams() {
    return this.#apiParams.state;
  }

  set apiParams(data) {
    this.#apiParams.state = data || "";
    this.#fetchOptions();
  }

  /** @returns {{ id: string, value: string }} */
  get selectedData() {
    return this.#selectedData.state;
  }

  set selectedData(data) {
    this.#selectedData.state = data || {};
    this.#fetchOptions();
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

    /** @returns {HTMLSelectElement} */
    get hiddenFieldEl() {
      return this.getElementById("hidden-field");
    }

  // =============== Public Methods ===============

  connectedCallback() {
    this.#createField(this.type);
    this.#updateAttributes();

    if (this.type === "search-select") {
      this.addListener("keyup", (event) => this.#changeHandler(event, true), this.fieldEl);
      this.addListener("change", (event) => this.#changeHandler(event), this.hiddenFieldEl);
      
    } else if (this.type === "date" || this.type === "select" || this.type === "switch") {
      this.addListener("change", (event) => this.#changeHandler(event), this.fieldEl);
    } else {
      this.addListener("keyup", (event) => this.#changeHandler(event, true), this.fieldEl);
    }
  }

  #updateAttributes() {
    const field = this.fieldEl;
    const label = this.labelEl;

    if (this.type === "switch") {
      this.fieldEl.innerHTML = this.label;
    }

    if (label) {
      this.ariaLabel = this.label;

      label.setAttribute("for", this.name);
      label.innerHTML = this.label;
    }

    if (field) {
      if (this.required) {
        field.setAttribute("required", this.required);
      }

      // if (this.disabled) {
      //   field.setAttribute("disabled", this.required);
      // }

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
    

    if (event.target === this.fieldEl) {
      this.value = event.target.value;
    } else if (event.target === this.hiddenFieldEl) {
      this.value = event.target.querySelector(`[value='${event.target.value}']`).innerHTML;
      this.fieldEl.value = this.value;
      
      this.selectedData.id = event.target.value;
      this.selectedData.value = this.value;

      console.log(this.selectedData);
    }
    
    if (this.value) {
      this.empty = false;
    } else {
      this.empty = true;
    }

    if (timeout) {
      this.#timeout.sleep(() => {
        this.#updateValue(event, this.type === "search-select");
        this.emitEvent(this.createEvent("field-changed", this.value));
      });
    } else {
      this.#updateValue(event, this.type === "search-select");
    }
  }

  /**
 * @param {Event} event
 */
  #updateValue(event) {
    if (this.type === "search-select" && event.type === "keyup") {
      // Hanlde API Call to populate select menu
      this.#fetchOptions(this.value);
    } else if (this.type === "search-select" && event.type === "change") {
      // Handle Actual value selection.

    }

    this.valid = this.#checkValidity();

    if (this.symbioticCallback) {
      this.symbioticCallback();
    }
  }
  

  /**
   * - Returns True if this field is valid, else returns false.
   * - Reports the validity of the field to the UI
   * @returns {boolean}
   */
  #checkValidity() {
    // By design, a MoSwitch field always has a valid value. (true or false).
    if (this.type == "switch") {
      return true;
    }

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
    
    const templateId = (this.type === "select" || this.type === "switch" || this.type === "search-select") ? this.type : "default";
    const clone = this.buildTemplate(templateId);

    if (fieldWrapper) {
      fieldWrapper.appendChild(clone);
    }

    if (this.type === "select") {
      // this.fieldEl.options = this.options;
      this.#buildOptions()
    }
  }

  #buildOptions(containerId = "field-input") {
    const container = this.shadow.getElementById(containerId);
    
    if (this.options && this.options.length) {
      this.options.forEach((option) => {
        const item = document.createElement("option");
        item.setAttribute("value", option.id);
        item.setAttribute("data", option.displayName);

        item.innerHTML = option.displayName;

        container.appendChild(item);
      });
    }
  }

  async #fetchOptions() {
    const [res, data] = await this.#apiManager.GET(this.#buildQuery());

    if (res.ok) {
      this.options = data;
      
      this.#updateHiddenFieldStyles();
      this.#buildOptions("hidden-field");
    }
  }

  #buildQuery() {
    const queryParams = this.#apiManager.buildQueryString({ 
      page: 0, 
      search: this.value || "", 
    });

    return `${this.apiParams}/${queryParams}`;
  }

  #updateHiddenFieldStyles() {
    const hiddenField = this.hiddenFieldEl;
    const size = this.options.length > 5 ? 5 : this.options.length;

    if (hiddenField) {
      hiddenField.style.display = size ? "" : "none"; 
      hiddenField.setAttribute("size", size);
      hiddenField.innerHTML = "";
    }
  }
}

customElements.define("mo-field", MoField);
