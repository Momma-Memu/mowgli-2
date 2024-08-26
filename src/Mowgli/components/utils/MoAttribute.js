// @ts-check
"use strict";

export class MoAttributeTypeMap {
  string = "string";
  boolean = "boolean";
  number = "number";
  date = "date";
}

export default class MoAttribute {
  #element;
  #attribute;
  #type;

  /**
   * @param {HTMLElement} element
   * @param {string} attribute
   * @param {keyof MoAttributeTypeMap} type
   */
  constructor(element, attribute, type = "string") {
    this.#element = element;
    this.#attribute = attribute;
    this.#type = type;
  }

  /** @returns {string | number | boolean | Date | null} */
  get attribute() {
    const value = this.#element.getAttribute(this.#attribute);

    if (value !== null) {
      if (this.#type === "boolean") {
        return value === "true";
      } else if (this.#type === "number") {
        return Number(value) || null;
      } else if (this.#type === "date") {
        return new Date(value) || null;
      }
    }

    return value;
  }

  /** @param {string} value */
  set attribute(value) {
    this.#element.setAttribute(this.#attribute, value);
  }
}
