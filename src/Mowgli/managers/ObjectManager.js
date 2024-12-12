import MowgliObject from '../objects/index';
import MowgliSource from '../objects/internal/sources/Source';
import MowgliChart from '../objects/internal/Chart';
import MowgliField from '../objects/internal/Field';
import MowgliForm from '../objects/internal/Form';
import MowgliRole from '../objects/internal/Role';
import MowgliUser from '../objects/internal/User';
import MowgliPlot from '../objects/internal/Plot';

export default class MowgliObjectManager {
  /** 
   * @type {{
   *  chart: MowgliChart,
   *  custom: MowgliObject,
   *  field: MowgliField,
   *  form: MowgliForm,
   *  role: MowgliRole,
   *  user: MowgliUser,
   *  source: MowgliSource,
   * }}
   */
  #cache = {};

  constructor() {

  }

  /** 
   * @returns { 
   *  MowgliChart | 
   *  MowgliObject | 
   *  MowgliField | 
   *  MowgliForm |
   *  MowgliRole |
   *  MowgliUser |
   *  MowgliSource |
   *  MowgliPlot
   * }
   */
  getMobject(name) {
    if (!this.#cache[name]) {
      this.#cache[name] = this.#buildObj(name);
    }

    return this.#cache[name];
  }


  #buildObj(name) {
    switch (name) {
      case "charts":
        return new MowgliChart();

      case "fields":
        return new MowgliField();

      case "forms":
        return new MowgliForm();

      case "roles":
        return new MowgliRole();

      case "users":
        return new MowgliUser();

      case "sources":
        return new MowgliSource();

      case "plot-types":
        return new MowgliPlot();

      default:
        // TODO: Needed for user created objects.
        return new MowgliObject(name);
    }
  }

  #buildCustom(...params) {
    return new MowgliObject(...params);
  }
}