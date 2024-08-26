import MoField from "../components/forms-fields/MoField/index";

export default class FieldDefinition {
  #name = "";
  #displayName = "";

  /** @type {keyof FieldType} */
  #type = "";

  #placeholder = "";
  #required = true;
  #defaultValue = "";
  #halfWidth = false;

  /**
   * @param {string} name
   * @param {string} displayName
   * @param {keyof FieldType} type
   * @param {string} placeholder
   * @param {string} label
   * @param {boolean} required
   * @param {*} defaultValue
   */
  constructor(
    name,
    required = true,
    displayName = "",
    type = "text",
    placeholder = "",
    defaultValue = "",
    halfWidth = false
  ) {
    this.#name = name;
    this.#required = required;
    this.#displayName = displayName;
    this.#type = type;
    this.#placeholder = placeholder;
    this.#defaultValue = defaultValue;
    this.#halfWidth = halfWidth;
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

  /* -------------------- Methods -------------------- */

  /**
   * Creates and returns a new MoField HTMLElement.
   * - Creates a new instance of the MoField HTMLElement class.
   * - Sets the starting properties from the values of this FieldDefinition's properties.
   *
   * @returns {MoField}
   */
  buildHTML() {
    const field = new MoField();

    field.name.attribute = this.#name;
    field.required.state = this.#required;
    field.label.attribute = this.#displayName;
    field.type.attribute = this.#type;
    field.placeholder.attribute = this.#placeholder || this.#displayName;
    field.halfWidth.state = this.#halfWidth;

    if (this.#defaultValue) {
      field.value = this.#defaultValue;
    }

    return field;
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
  multiSelect = "multi-select";
}
