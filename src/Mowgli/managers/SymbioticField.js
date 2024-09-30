// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";

export default class SymbioticFieldManager {
  #parent;
  #child;
  #prop;
  /** 
   * @param {FieldDefinition} parent
   * @param {FieldDefinition} child
   * @param {string} prop
   */
  constructor(parent, child, prop = "") {
    this.#parent = parent;
    this.#child = child;
    this.#prop = prop;

    this.#parent.field.parent = true;
    this.#child.field.disabled = true;

    this.#parent.field.symbioticCallback = () => this.updateDependency();
    this.#parent.field.addCleanUpCallback(() => this.destroy());
  }

  get parent() {
    return this.#parent;
  }

  get child() {
    return this.#child;
  }

  updateDependency() {
    this.child.field.disabled = !this.parent.field.valid;
    
    if (this.#prop) {
      this.child.field[this.#prop] = this.parent.field.value || "";
    }
  }

  destroy() {
    this.#parent.field.symbioticCallback = null;
    this.#parent = null;
    this.#child = null;
  }
}
