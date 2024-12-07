// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";

export default class SymbioticFieldManager {
  #parent;
  #child;
  #childProp;
  #parentProp;
  #callbackOverride = null;

  /** 
   * @param {FieldDefinition} parent
   * @param {FieldDefinition} child
   * @param {string} parentProp
   * @param {string} childProp
   */
  constructor(parent, child, parentProp = "value", childProp = "value", callbackOverride = null) {
    this.#parent = parent;
    this.#child = child;
    this.#parentProp = parentProp;
    this.#childProp = childProp;
    this.#callbackOverride = callbackOverride;

    this.#child.field.disabled = this.#callbackOverride ? false : true;

    if (this.#callbackOverride) {
      this.#parent.field.symbioticCallbacks.push(() => this.#callbackOverride());
    } else {
      this.#parent.field.symbioticCallbacks.push(() => this.updateDependency());
    }

    this.#parent.field.addCleanUpCallback(() => this.destroy());
  }

  get parent() {
    return this.#parent;
  }

  set parent(val) {
    this.#parent = val;
  }

  get child() {
    return this.#child;
  }

  set child(val) {
    this.#child = val;
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
