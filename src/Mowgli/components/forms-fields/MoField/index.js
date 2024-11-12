// eslint-disable-next-line no-unused-vars
import MowgliAPI from "@/Mowgli/API/index";
// eslint-disable-next-line no-unused-vars
import { FieldType } from "../../enums/KeyCodes";

import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import MoSelect from "../MoSelect/index";

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
  #value = this.addState("");
  #valueId = this.addState("");
  #apiParams = this.addState("");
  #lastQuery = this.addState("");

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

    if (this.type === "select" && this.fieldEl) {
      this.fieldEl.searchField.value = data;
    }

    if (this.fieldEl) {
      this.fieldEl.value = data;
    }

    this.empty = this.value === "";
    this.valid = this.#checkValidity();
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
    this.#apiManager = new MowgliAPI(`${this.apiRoute}`);

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
    const changeTypes = ["date", "select", "search-select", "switch"];
    this.#createField(this.type);
    this.#initAttributes();

    // if (this.type === "select" || this.type === "search-select") {
    //   this.addListener("search-change", this.#fetchOptions())
    // }

    if (changeTypes.includes(this.type)) {
      this.addListener("change", (event) => this.#changeHandler(event), this.fieldEl);
    } else if (this.type !== "select") {
      this.addListener("keyup", (event) => this.#changeHandler(event), this.fieldEl);
    }
  }

  reset() {
    this.value = "";
    this.valueId = "";

    this.dirty = false;
    this.valid = false;
  }

  #initAttributes() {
    const field = this.fieldEl;
    const label = this.labelEl;

    if (label && field) {
      this.ariaLabel = this.label;

      label.setAttribute("for", this.name);
      label.innerHTML = this.label;

      if (this.type === "switch") {
        this.fieldEl.innerHTML = this.label;
      }

      if (this.required) {
        field.setAttribute("required", this.required);
      }

      if (this.type !== "select" && this.type !== "search-select") {
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
    this.value = event.target.value;
    this.valueId = event.target.valueId;
    // this.empty = this.value === "";
    // this.valid = this.#checkValidity();

    if (event.type === "keyup" && !this.empty) {
      this.#timeout.sleep(() => {
        // this.emitEvent(this.createEvent("field-changed", this.value));

        if (this.symbioticCallback) {
          this.symbioticCallback();
        }
      });
    } else if (!this.empty) {
      if (this.symbioticCallback) {
        this.symbioticCallback();
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

    const templateId =
      this.type === "select" || this.type === "switch" || this.type === "search-select"
        ? this.type
        : "default";
    const clone = this.buildTemplate(templateId);

    if (fieldWrapper) {
      fieldWrapper.appendChild(clone);
    }

    if (this.type === "select" && this.options) {
      this.fieldEl.options = this.options;
      // this.#buildOptions()
    } else if (this.type === "switch") {
      this.#value.state = false;
    }
  }

  async #fetchOptions() {
    const queryString = this.#buildQuery();

    if (queryString !== this.lastQuery && !this.disabled) {
      this.lastQuery = queryString;

      const [res, data] = await this.#apiManager.GET(this.#buildQuery());

      if (res.ok) {
        this.options = data;

        // this.#updateHiddenFieldStyles();
        this.fieldEl.options = this.options;
      }
    }
  }

  #buildQuery() {
    const queryParams = this.#apiManager.buildQueryString({
      page: 0,
      search: this.value || ""
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
