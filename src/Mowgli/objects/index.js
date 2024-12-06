import MowgliAPI from "../API/index";
import MowgliCache from "../state/cache/index";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";
import MoForm from "../components/forms-fields/MoForm/index";
import SymbioticField from "../managers/SymbioticField";
import ListManager from "../managers/ListManager";
import MoEvent from "../components/utils/MoEvent";

// import MowgliFormManager from "../MowgliFormManager";
// import MowgliListManager from "../MowgliListManager/index"
// import MowgliButton from "../MowgliUI/MowgliButton/mo-button";
// import MowgliEvent from "../EventManager/MowgliEvent";

export default class MowgliObject {
  #HydrateEvent = (data) => new MoEvent(this.name  + data.id, data);
  // #UIFetchReqListener = (event) => this.#processUIFetchRequest(event);
  // #authEvent = new MowgliEvent("mowgli-auth-event");

  #api;

  #disableCache = null;

  #state;
  // #state = { list: [], obj: {}, stale: true, };
  
  #name;
  #prevParams = null;

  /** @type {Boolean} */
  #editOnly = false;

  /** @type {ListManager} */
  #listManager;

  #fields;
  #columns;


  /** @type {MowgliObject[]} */
  #dependencies;

  /**
   * @param {string} api
   * @param {FieldDefinition[]} fields
   * @param {FieldDefinition[] | null} columns
   * @param {string} name
   */
  constructor(api, fields = [], columns = null, name = "") {
    this.#api = new MowgliAPI(api);
    this.#state = new MowgliCache(api);

    /** @type {FieldDefinition[]} */
    this.#fields = fields;

    /** @type {FieldDefinition[]} */
    this.#columns = columns || fields;

    this.#name = name || api[0].toUpperCase() + api.slice(1);
  }

  get fields() {
    return this.#fields;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return `
      Click "Create", to make your new ${this.name}. Select any ${this.name} from the list below to edit or remove it.
    `;
  }

  get dependencies() {
    return this.#dependencies;
  }

  set dependencies(dependencies) {
    this.#dependencies = dependencies;
  }

  get state() {
    return this.#disableCache;
    // return this.#state.cache;
    // if (this.#state.stale) {
    //   const cache = this.#cache.cache;

    //   if (cache) {
    //     this.#state.list = cache;
    //     this.#state.obj = this.#createStateObj(cache);
    //     this.#state.stale = false;
    //   }
    // }
    // return this.#state.obj;
  }

  set state(state) {
    this.#disableCache = state;
    // this.#state.cache = state;
  }
  
  /** @type {ListManager} */
  get listManager() {
    return this.#listManager;
  }

  set listManager(lm) {
    this.#listManager = lm;
  }

  /** @type {FieldDefinition[]} */
  get columns() {
    return this.#columns;
  }

  set columns(fields) {
    this.#columns = fields;
  }

  /** @type {Boolean} */
  get editOnly() {
    return this.#editOnly;
  }

  set editOnly(flag) {
    this.#editOnly = flag;
  }

  getRecordById(id) {
    if (this.state && Array.isArray(this.state)) {
      return this.state.find(record => record.id === Number(id));
    }
  }

  buildQueryString(obj) {
    const keys = Object.keys(obj);
    return "?" + keys.map((key) => `${key}=${obj[key]}`).join("&");
  }

  /**
   * @param {MowgliObject} mowgliObject - The MowgliObject that is responsible for interfacing with the API.
   * @param {string} routeParams - Optional API params.
   * @returns {Any[]} Returns a list of Select field options.
   */
  async fetchOptions(mowgliObject, routeParams = "") {
    const [res, data] = await mowgliObject.get(routeParams);

    return res.ok ? data : [];
  }

  /**
   * - GET Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async get(params = "") {
    // if (this.state && params !== this.#prevParams) {
    //   return [{ ok: true, status: 200 }, this.state];
    // } else {
      this.#prevParams = params;
      const [response, data] = await this.#api.GET(params);

      if (response.ok && data) {
        this.state = data;
      }

      return [response, data];
    // }
  }

  /**
   * - POST Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async post(params = "", body) {
    const [response, data] = await this.#api.POST(params, body);

    if (response.ok) {
      if (this.state && Array.isArray(this.state)) {
        this.state.push(data);
      } else {
        this.state = data;
      }
      // this.#updateDependencies(data);
    }

    return [response, data];
  }

  /**
   * - PUT Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async put(params = "", body) {
    const [response, data] = await this.#api.PUT(params, body);

    if (response.ok) {
      if (this.state && Array.isArray(this.state)) {
        const index = this.state.findIndex(record => record.id === Number(data.id));
        const newState = [...this.state];
        newState[index] = data;

        this.state = newState;
      } else {
        this.state = data;
      }
      // this.#updateCache(data);
      // this.#updateDependencies(data);
    }

    return [response, data];
  }

  /**
   * - DELETE Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async delete(params = "") {
    const [response, data] = await this.#api.DELETE(params);

    if (response.ok) {
      this.#remove(data);
    }

    return [response, data];
  }

  /** @returns {MoForm} */
  buildForm() {
    const form = new MoForm();
    form.build(this.fields);

    return form;
  }

  /**
   * @param {FieldDefinition} parent
   * @param {FieldDefinition} child
   * @param {string} parentProp
   * @param {string} childProp
   */
  buildDependency(parent, child, parentProp = "value", childProp = "value", callbackOverride = null) {
    return new SymbioticField(parent, child, parentProp, childProp, callbackOverride);
  }

  buildListTable() {
    this.#listManager = new ListManager(this.#name, this.columns, "sources");
    this.#listManager.records = this.state || [];

    return this.#listManager.build();
  }

  #updateCache(data) {
    // TODO: Remove condition after backend API responds consistently.
    if (Array.isArray(data)) {
      data = data.reduce((obj, value) => {
        console.log(value.id)
        if (value.id) {
          obj[value.id] = value;
        } else if (value.flag) {
          obj[value.flag] = value;
        }

        return obj;
      }, {});
    }

    let newState = this.state ? { ...this.state } : {};

    if (data.id) {
      newState[data.id] = data;
    } else if (this.#typeof(data) === "object") {
      newState = { ...newState, ...data };
    }

    this.state = newState;
  }

  #updateDependencies(data) {
    if (this.dependencies) {
      this.dependencies.forEach(mobject => {
        const match = mobject.state[data.id];
  
        if (match) {
          const state = { ...mobject.state };
          state[data.id] = data;
          
          mobject.state = state;
        }
      });
    }
  }

  #remove(id) {
    if (this.state && Array.isArray(this.state)) {
      this.state = this.state.filter(record => record.id = id);
    } else {
      this.state = null;
    }
    // const dataMap = { ...this.state };
    // delete dataMap[id];

    // this.state = dataMap;
  }

  /** @param {*} data  */
  #typeof(data) {
    return Array.isArray(data) ? "array" : typeof data;
  }

  #createStateObj(state) {
    return state.reduce((obj, value) => {
      console.log(value.id)
      if (value.id) {
        obj[value.id] = value;
      } else if (value.flag) {
        obj[value.flag] = value;
      }

      return obj;
    }, {});
  }

  // #handleAuthEvent(state) {
  //   const shouldDispatch = (state && window.location.pathname === "/") || (!state && window.location.pathname !== "/");
  //   const newLocation = state ? "/dashboard" : "/"
  //   if (shouldDispatch) {
  //     this.#authEvent.detail = newLocation;
  //     this.#authEvent.dispatch()
  //   }
  // }

  // /** @param {CustomEvent} event  */
  // async #processUIFetchRequest({ detail }) {
  //   if (!this.state && !this.stateManager.fetched) {
  //     await this.get();
  //   }
  //   if (detail.component && detail.property) {
  //     const { component, property } = detail;
  //     component[property] = this.state;
  //   }
  // }
}
