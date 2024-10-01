import MowgliAPI from "../API/index";
import MowgliCache from "../state/cache/index";

// eslint-disable-next-line no-unused-vars
import FieldDefinition from "../builders/FieldDefinition";
import MoForm from "../components/forms-fields/MoForm/index";
import SymbioticField from "../managers/SymbioticField";
import ListManager from "../managers/ListManager";

// import MowgliFormManager from "../MowgliFormManager";
// import MowgliListManager from "../MowgliListManager/index"
// import MowgliButton from "../MowgliUI/MowgliButton/mo-button";
// import MowgliEvent from "../EventManager/MowgliEvent";

export default class MowgliObject {
  // #UIFetchReqListener = (event) => this.#processUIFetchRequest(event);
  // #authEvent = new MowgliEvent("mowgli-auth-event");

  #api;
  #state;
  #name;
  #listManager;

  /** 
   * @param {string} api 
   * @param {FieldDefinition[]} fields 
   * @param {string} name
   */
  constructor(api, fields = [], name = "") {
    this.#api = new MowgliAPI(api);
    this.#state = new MowgliCache(api);

    /** @type {FieldDefinition[]} */
    this.fields = fields;

    this.#name = name || api[0].toUpperCase() + api.slice(1);
  }

  get name() {
    return this.#name;
  }

  get state() {
    return this.#state.cache;
  }

  /** @type {ListManager} */
  get listManager() {
    return this.#listManager;
  }

  set listManager(lm) {
    this.#listManager = lm;
  }

  buildQueryString(obj) {
    const keys = Object.keys(obj);
    return "?" + keys.map(key => `${key}=${obj[key]}`).join("&");
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
    if (this.state) {
      return [{ ok: true, status: 200 }, this.state];
    }

    const [response, data] = await this.#api.GET(params);
    this.#append(data);

    return [response, data];
  }

  /**
   * - POST Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
  */
  async post(params = "", body) {
    const [response, data] = await this.#api.POST(params, body);

    if (response.ok) {
      this.#append(data);
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
      this.#append(data);
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
  buildDependency(parent, child, parentProp = "value", childProp = "value") {
    return new SymbioticField(parent, child, parentProp, childProp);
  }

  buildListTable() {
    this.#listManager = new ListManager(this.#name, this.fields, "sources");
    this.#listManager.records = this.state || [];

    return this.#listManager.build();
  }

  #append(data) {
    if (typeof data === "boolean") {
      return;
    }

    this.#state.cache = this.#combineWithCache();
  }

  #combineWithCache(data) {
    const dataMap = {...this.#state.cache};

    if (Array.isArray(data)) {
      data.forEach(item => {
        dataMap[item.id] = item;
      });
    } else if (typeof data === "object") {
      dataMap[data.id] = data;
    }
  }

  #remove(id) {
    const dataMap = {...this.#state.cache};
    delete dataMap[id];
    
    this.#state.cache = dataMap;
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
