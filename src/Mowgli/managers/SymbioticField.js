// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";

export default class SymbioticFieldManager {
  #parent;
  #child;
  #childProp;
  #parentProp;

  /** 
   * @param {FieldDefinition} parent
   * @param {FieldDefinition} child
   * @param {string} parentProp
   * @param {string} childProp
   */
  constructor(parent, child, parentProp = "value", childProp = "value") {
    this.#parent = parent;
    this.#child = child;
    this.#parentProp = parentProp;
    this.#childProp = childProp;

    // this.#parent.field.parent = true;
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
    
    if (this.#childProp) {
      this.child.field[this.#childProp] = this.parent.field[this.#parentProp] || "";
    }
  }

  destroy() {
    this.#parent.field.symbioticCallback = null;
    this.#parent = null;
    this.#child = null;
  }
}
