import MoField from "../components/forms-fields/MoField/index";
import MowgliDateManager from "../managers/DateManager";

export default class FieldDefinition {
  #dateManager = new MowgliDateManager();

  #name = "";
  #displayName = "";

  /** @type {keyof FieldType} */
  #type = "";

  /** @type {string} */
  #pattern = "";

  #placeholder = "";
  #required = true;
  #defaultValue = "";
  #halfWidth = false;
  #options = [];
  #apiRoute = "";
  #dependentField = null;
  #controllingField = null;
  #disabled = false;
  #disableWhitespace = false;

  
  /** @type {FieldDefinition} */
  hiddenIdField;

  /** @type {boolean} */ 
  useValueID = false;

  /** @type {MoField} */
  #field = new MoField();;

  /**
   * @param {string} name
   * @param {string} displayName
   * @param {keyof FieldType} type
   * @param {string} placeholder
   * @param {string} label
   * @param {boolean} required
   * @param {*} defaultValue
   * @param {string} api
   * @param {Any[]} options
   */
  constructor(
    name,
    required = true,
    displayName = "",
    type = "text",
    placeholder = "",
    defaultValue = "",
    halfWidth = false,
    apiRoute = "",
    options = [],
  ) {
    this.#name = name;
    this.#required = required;
    this.#displayName = displayName;
    this.#type = type;
    this.#placeholder = placeholder;
    this.#defaultValue = defaultValue;
    this.#halfWidth = halfWidth;
    this.#apiRoute = apiRoute;
    this.#options = options;
  }

  /* --------------- Getters / Setters --------------- */

  get name() {
    return this.#name;
  }

  get required() {
    return this.#required;
  }

  set required(value) {
    this.#required = value;
  }

  get displayName() {
    return this.#displayName;
  }

  set displayName(value) {
    this.#displayName = value;
  }

  get type() {
    return this.#type;
  }

  set type(value) {
    this.#type = value;
  }

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(value) {
    this.#placeholder = value;
  }

  get defaultValue() {
    return this.#defaultValue;
  }

  set defaultValue(value) {
    this.#defaultValue = value;
  }

  get halfWidth() {
    return this.#halfWidth;
  }

  set halfWidth(value) {
    this.#halfWidth = value;
  }

  get apiRoute() {
    return this.#apiRoute;
  }

  set apiRoute(value) {
    this.#apiRoute = value;
  }

  get options() {
    return this.#options;
  }

  set options(value) {
    this.#options = value;
  }

  get field() {
    return this.#field
  }

  set field(field) {
    this.#field = field;
  }

  get pattern() {
    return this.#pattern
  }

  set pattern(pattern) {
    this.#pattern = pattern;
  }

  get disableWhitespace() {
    return this.#disableWhitespace
  }

  set disableWhitespace(disableWhitespace) {
    this.#disableWhitespace = disableWhitespace;
  }

  /* -------------------- Methods -------------------- */

  /**
   * Creates and returns a new MoField HTMLElement.
   * - Creates a new instance of the MoField HTMLElement class.
   * - Sets the starting properties from the values of this FieldDefinition's properties.
   *
   * @returns {MoField}
   */
  buildHTML() {
    // this.field = new MoField();

    this.field.name = this.#name;
    this.field.required = this.#required;
    this.field.label = this.#displayName;
    this.field.type = this.#type;

    this.field.placeholder = this.#placeholder || this.#displayName;
    this.field.halfWidth = this.#halfWidth;

    if (this.#defaultValue) {
      this.field.value = this.#defaultValue;
    }

    if (this.#type === "select") {
      this.field.options = this.#options;
    }

    if (this.apiRoute) {
      this.field.apiRoute = this.apiRoute;
    }

    if (this.pattern) {
      this.field.pattern = this.pattern;
    }

    if (this.disableWhitespace) {
      this.field.disableWhitespace = true;
    }

    return this.field;
  }

  /** @param {string | boolean | Array<{}> | {}} [recordValue=""]  */
  getFormattedValue(recordValue = "") {
    try {
      if (this.type === "multi-select" && typeof recordValue === "object") {
        return Array.isArray(recordValue) ? recordValue.map(rec => rec.label).join(", ") : recordValue.name;
      }
      
      if (this.type === "select" && typeof recordValue === "object") {
        return Array.isArray(recordValue) ? recordValue[0].name : recordValue.name;
      }

      if (typeof recordValue === "boolean") {
        return recordValue ? "Yes" : "No";
      }
      
      const value = recordValue || this.field.value || this.#defaultValue;

      if (this.type === "date") {
        return this.#dateManager.toDb(value);
      } else {
        return value;
      }
    } catch(err) {
      return "";
    }
  }
}

/**
 * @readonly
 * @enum {string}
 */
export class FieldType {
  text = "text";
  email = "email";
  number = "number";
  date = "date";
  switch = "switch";

  select = "select";
  "search-select" = "search-select";

  multiSelect = "multi-select";
  mutliSearchSelect = "multi-search-select";
}
