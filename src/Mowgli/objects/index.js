import MowgliAPI from "../API/index";
import MowgliCache from "../state/cache/index";

// import MowgliState from "../StateManager/MowgliState";
// import MowgliFieldDefinition from "../MowgliFormManager/MowgliFieldDefinition";
// import MowgliFormManager from "../MowgliFormManager";
// import MowgliListManager from "../MowgliListManager/index"
// import MowgliButton from "../MowgliUI/MowgliButton/mo-button";
// import MowgliEvent from "../EventManager/MowgliEvent";

export default class MowgliObject {
  // #UIFetchReqListener = (event) => this.#processUIFetchRequest(event);
  // #authEvent = new MowgliEvent("mowgli-auth-event");

  // #GET = "GET";
  // #DELETE = "DELETE";
  // #POST = "POST";
  // #PUT = "PUT";

  #api;
  #state;
  // #stateManager;
  // #formManager;
  // #listManager;
  // /**
  //  * @param {string} name - String used as the key to interface with the associated MowgliCache instance.
  //  * @param {boolean} persistCache - Enables/disables persistent state storage via the MowgliCache.
  //  */
  // constructor(name, persistCache = true, customApiUrl = "", userCreated = false) {
  //   this.name = name;
  //   const url = customApiUrl || name;
  //   this.#api = new MowgliAPI(url);
  //   this.#stateManager = new MowgliState(name, persistCache, userCreated);
  //   this.#formManager = new MowgliFormManager([], this.name);
  //   this.#formManager.modal.mowgliObject = this;
  //   window.addEventListener(`mo-ui-${this.name}-state-fetch`, this.#UIFetchReqListener);
  // }

  /** @param {string} api  */
  constructor(api, fields = []) {
    this.#api = new MowgliAPI(api);
    this.#state = new MowgliCache(api);
    this.fields = fields;
  }

  // /** @returns {Array<MowgliFieldDefinition>} fieldDefinitions */
  // get fieldDefinitions() {
  //   return this.#formManager.fieldDefinitions;
  // }

  // /** @param {Array<MowgliFieldDefinition>} fieldDefinitions */
  // set fieldDefinitions(fieldDefinitions) {
  //   fieldDefinitions.forEach((fieldDef, index) => {
  //     fieldDef.setCollapseParams(index);
  //   });
  //   this.#formManager.fieldDefinitions = fieldDefinitions;
  //   this.#listManager = new MowgliListManager(this.name, this.#formManager.fieldDefinitions);
  // }

  // /** @returns {MowgliListManager} */
  // get listManager() {
  //   return this.#listManager;
  // }

  // get state() {
  //   return this.#stateManager.state;
  // }

  // get stateManager() {
  //   return this.#stateManager;
  // }

  // get form() {
  //   return this.#formManager;
  // }
  // /**
  //  * - Returns an object from the MowgliCache if present, otherwise returns null.
  //  * @param {string} id - Unique ID of the object stored within the MowgliCache.
  //  */
  // getObjById(id) {
  //   if (Array.isArray(this.state)) {
  //     return this.state.find(el => el.id === id);
  //   }
  //   return null;
  // }

  /**
   * - GET Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async get(params = "") {
    // this.stateManager.fetched = true;
    const [response, data] = await this.#api.GET(params);
    this.#state.cache = data;
    console.log(response, data);
    // return this.#handleResponse(response, data, this.#GET);
  }

  /**
   * - POST Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async post(params = "", body) {
    const [response, data] = await this.#api.POST(params, body);
    
    console.log(response, data);

    this.#state.cache = data;

    return [response, data];
    // return this.#handleResponse(response, data, this.#POST);
  }

  /**
   * - PUT Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async put(params = "", body) {
    const [response, data] = await this.#api.PUT(params, body);
    console.log(response, data);
    // return this.#handleResponse(response, data, this.#PUT);
  }

  /**
   * - DELETE Method Fetch Request.
   * @param {string} params - URL Route/Path parameters.
   */
  async delete(params = "") {
    const [response, data] = await this.#api.DELETE(params);
    console.log(response, data);
    // return this.#handleResponse(response, data, this.#DELETE);
  }

  // /**
  //  * - Resolves the HTTP response, and data, by notifying the relevant MowgliCache to update itself accordingly.
  //  * @param {Response} response
  //  * @param {any} data
  //  * @param {string} method
  //  */
  // #handleResponse(response, data, method) {
  //   const { status } = response;
  //   if (status < 400 && data !== undefined && data !== null) {
  //     this.#stateManager.updateCache(method, data);
  //   }
  //   if (this.name === "session") {
  //     const authState = status === 401 || status >= 400 ? false : true;
  //     this.#handleAuthEvent(authState);
  //     return [response, authState];
  //   }
  //   return [response, data];
  // }
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
