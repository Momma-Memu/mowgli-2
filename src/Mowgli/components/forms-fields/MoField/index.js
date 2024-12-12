// eslint-disable-next-line no-unused-vars
import MowgliAPI from "@/Mowgli/API/index";
// eslint-disable-next-line no-unused-vars
import { FieldType } from "../../enums/KeyCodes";

import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MoSelect from "../MoSelect/index";
// import MoEvent from "../../utils/MoEvent";

export default class MoField extends MoComponent {
  #disableWhitespace = false;
  #templateTypes = ["time", "number", "select", "multi-select", "switch", "textarea"];

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

  #options = this.addState();
  #timeout = this.addTimeout(500);
  #value = this.addState("");
  #valueId = this.addState("");
  #apiParams = this.addState("");
  #lastQuery = this.addState("");

  /** @type {function[]} */
  symbioticCallbacks = [];

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

    // if (value && this.fieldEl) {
    //   this.fieldEl.removeAttribute("tabindex");
    // } else if (!value && this.fieldEl) {
    //   this.fieldEl.setAttribute("tabindex", 0);
    // } else if (value) {
    //   this.setAttribute("tabindex", -1);
    // }
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

  get lastQuery() {
    return this.#lastQuery.state;
  }

  set lastQuery(queryString) {
    this.#lastQuery.state = queryString;
  }

  get disableWhitespace() {
    return this.#disableWhitespace;
  }

  set disableWhitespace(disableWhitespace) {
    this.#disableWhitespace = disableWhitespace;
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
    data = data === undefined || data === null ? "" : data;
    this.#value.state = data;

    if (this.type && this.type.includes("select") && this.fieldEl) {
      this.fieldEl.searchField.value = data;
    }

    if (this.fieldEl) {
      this.fieldEl.value = data;
    }

    this.empty = this.value === "";
    this.valid = this.#checkValidity();
    this.emitEvent(this.createEvent("field-changed", data));
  }

  get valueId() {
    return this.#valueId.state;
  }

  set valueId(data) {
    this.#valueId.state = data;
  
    if (this.fieldEl) {
      this.fieldEl.valueId = data;
    }
  }

  get apiRoute() {
    return this.#apiRoute.state;
  }

  set apiRoute(data) {
    this.#apiRoute.state = data || "";

    if (this.fieldEl) {
      this.fieldEl.apiRoute = this.apiRoute;
    }
  }

  get apiParams() {
    return this.#apiParams.state;
  }

  set apiParams(data) {
    this.#apiParams.state = data || "";

    if (this.fieldEl) {
      this.fieldEl.apiParams = this.apiParams;
    }
  }

  // ================== Elements ==================

  /** @returns {HTMLLabelElement} */
  get labelEl() {
    return this.getElementById("field-label");
  }

  /** @returns {HTMLInputElement | MoSelect} */
  get fieldEl() {
    return this.getElementById("field-input");
  }

  /** @returns {HTMLSelectElement} */
  get hiddenFieldEl() {
    return this.getElementById("hidden-field");
  }

  // =============== Public Methods ===============

  connectedCallback() {
    const changeTypes = ["date", "select", "multi-select", "switch"];
    this.#createField(this.type);
    this.#initAttributes();

    // if (this.type === "select" || this.type === "search-select") {
    //   this.addListener("search-change", this.#fetchOptions())
    // }

    if (changeTypes.includes(this.type)) {
      this.addListener("change", (event) => this.#changeHandler(event), this.fieldEl);
    } else if (!this.type.includes("select")) {
      this.addListener("keyup", (event) => this.#changeHandler(event), this.fieldEl);
    }
  }

  reset() {
    this.value = "";
    this.valueId = "";

    this.dirty = false;
    this.valid = false;

    if (this.type === "multi-select") {
      this.fieldEl.reset();
    }
  }

  #initAttributes() {
    const field = this.fieldEl;
    const label = this.labelEl;

    if (label && field) {
      this.fieldEl.title = this.label;
      this.ariaLabel = this.label;

      label.setAttribute("for", this.name);
      label.innerHTML = this.label;

      if (this.type === "switch") {
        this.fieldEl.innerHTML = this.label;
      }

      if (this.required) {
        field.setAttribute("required", this.required);
      }

      if (!this.type.includes("select")) {
        field.setAttribute("name", this.name);
        field.setAttribute("type", this.type);
      }

      field.setAttribute("placeholder", this.placeholder);
    }

    if (this.apiRoute) {
      this.fieldEl.apiRoute = this.apiRoute;
    }
  }

  /** @param {Event} event */
  #changeHandler(event) {
    event.stopPropagation();

    this.dirty = true;
    this.value = this.#disableWhitespace ? event.target.value.replace(/\s/g, "") : event.target.value;
    this.valueId = event.target.valueId;

    if (event.type === "keyup" && !this.empty) {
      this.#timeout.sleep(() => {
        if (this.symbioticCallbacks) {
          for (let cb of this.symbioticCallbacks) {
            cb();
          }
        }
      });
    } else if (!this.empty) {
      if (this.symbioticCallbacks) {
        for (let cb of this.symbioticCallbacks) {
          cb();
        }
      }
    }
  }

  /**
   * - Returns True if this field is valid, else returns false.
   * - Reports the validity of the field to the UI
   * @returns {boolean}
   */
  #checkValidity() {
    // By design, a MoSwitch field always has a valid value. (true or false).
    if (this.type == "switch" || !this.fieldEl) {
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

    const templateId = this.#templateTypes.includes(this.type) ? this.type : "default";
    const clone = this.buildTemplate(templateId);

    if (fieldWrapper) {
      fieldWrapper.appendChild(clone);
    }

    if (this.type === "date") {
      // this.fieldEl.setAttribute("format", "yyyy-mm-dd");
    }

    if (this.type === "select" && this.options) {
      this.fieldEl.options = this.options;
    } else if (this.type === "switch") {
      this.value = false;
    }

    if (this.type === "time") {
      this.valid = true;
      this.dirty = true;
    }
  }
}

customElements.define("mo-field", MoField);
