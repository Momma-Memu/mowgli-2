// eslint-disable-next-line no-unused-vars
import MowgliObject from "../objects/index";

export default class DependencyManager {
  
  /** @type {MowgliObject} */
  #dependency;
  #conditions;

  /** 
   * @param {MowgliObject} dependency 
   * @param {{ 
   *  add: { property: string, value: any },
   *  update: { property: string, value: any },
   *  remove: { property: string, value: any },
   * }} conditions 
  */
  constructor(dependency, conditions) {
    this.#dependency = dependency;
    this.#conditions = conditions;
  }



  /** 
   * @param { "update" | "remove" } action
   * @param {Object.<string, any>} data 
  */
  handleChange(action, data) {
    const target = this.#dependency.state[data.id];
    if (!target) {
      return;
    }

    if (action === "add" || action === "update") {
      this.#add(data)
    }
  }

  #newState() {
    return { ...this.#dependency.state };
  }

  /** @param {Object.<string, any>} data */
  #add(data) {
    const state = this.#newState();
    state[data.id] = data;

    this.#dependency.state = state;
  }

  /** @param {Object.<string, any>} data */
  #update(data) {
    const state = this.#newState();
    state[data.id] = data;

    this.#dependency.state = state;
  }
  
}