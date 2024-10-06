import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

// eslint-disable-next-line no-unused-vars
import { FieldType } from "../../enums/KeyCodes";
import MowgliAPI from "@/Mowgli/API/index";

export default class MoSelect extends MoComponent {
  /** @type {MowgliAPI} */
  #apiManager;

  #apiRoute = this.addState("");
  #apiParams = this.addState("");
  #type = this.addState("");
  

  #value = this.addState("");
  #valueId = this.addState("");
  #options = this.addState([]);
  
  #placeholder = this.addAttribute("");
  #timeout = this.addTimeout(500);

  constructor() {
    super(styles, template);
  }

  /** @type {string} */
  get apiRoute() {
    return this.#apiRoute.state;
  }

  set apiRoute(state) {
    this.#apiRoute.state = state;
    this.#apiManager = new MowgliAPI(state);

    if (!this.options || !this.options.length) {
      this.#fetchOptions();
    }
  }

  /** @type {string} */
  get apiParams() {
    return this.#apiParams.state;
  }

  set apiParams(state) {
    this.#apiParams.state = state;

    if (this.apiRoute && this.#apiManager) {
      this.#fetchOptions();
    }
  }

  /** @type {keyof FieldType} */
  get type() {
    return this.#type.state;
  }

  set type(state) {
    this.#type = state;
  }

  /** @type {string} */
  get value() {
    return this.#value.state;
  }

  set value(state = "") {
    this.#value.state = state;
  }

  /** @type {string} */
  get valueId() {
    return this.#valueId.state;
  }

  set valueId(state) {
    this.#valueId.state = state;
  }

  /** @type {{ id: string, displayName: string }[]} */
  get options() {
    return this.#options.state;
  }

  set options(state) {
    this.#options.state = state || [];
    this.buildOptions();
  }
  
  /** @type {string} */
  get placeholder() {
    return this.#placeholder.attribute;
  }
  
  set placeholder(state = "Select an Option") {
    this.#placeholder.attribute = state;
  }

  /** @type {HTMLSelectElement} */
  get selectField() {
    return this.shadow.getElementById("select-field");
  }

  /** @type {HTMLInputElement} */
  get searchField() {
    return this.shadow.getElementById("search-field");
  }

  get validity() {
    return this.selectField.validity;
  }

  reportValidity() {
    return this.selectField.reportValidity();
  }

  connectedCallback() {
    this.addListener("click", (event) => this.#select(event), this.selectField);
    this.addListener("keyup", (event) => this.#timeout.sleep(() => this.#search(event), this.searchField));
  }

  // #emitSearchParams() {
  //   this.emitEvent(this.createEvent("search-change", { params: this.searchField  }));
  // }

  buildOptions() {
    if (this.selectField && this.options && this.options.length) {
      // const groups = {};

      // this.options.forEach((option) => {
      //   const parts = option.displayName.split("/");
      //   const group = parts[0];
      //   const name = parts.slice(1).join("/");

      //   if (!groups[group]) {
      //     groups[group] = [];
      //   }

      //   groups[group].push(name);


      // });

      // for(const key in groups) {
      //   console.log(key, groups[key])
      // }

      const container = this.selectField;
      container.setAttribute("size", this.#getSize());
      container.innerHTML = "";
      
      this.options.forEach(({id, displayName, name}) => {
        const option = document.createElement("option");
        option.value = id;
        option.innerHTML = displayName || name;

        container.appendChild(option);
      });
    }
  }

  /** @param {Event} event */
  #select(event) {
    event.stopPropagation();
    const option = this.selectField.selectedOptions[0];
    this.value = option.innerHTML;
    this.valueId = option.value;
    this.searchField.value = this.value;

    this.emitEvent(this.createEvent("change", { value: this.value, id: this.valueId  }));
  }

  /** @param {Event} event */
  #search(event) {
    event.stopPropagation();

    if (this.value !== this.searchField.value) {
      this.#fetchOptions();
    }
  }

  #getSize() {
    return this.options.length > 5 ? 5 : this.options.length;
  }

  #buildQuery() {
    if (!this.#apiRoute) {
      return;
    }
    
    if (!this.#apiManager) {
      this.#apiManager = new MowgliAPI(this.#apiRoute);
    }


    const queryParams = this.#apiManager.buildQueryString({ 
      page: 0, 
      search: this.searchField.value || "", 
    });

    return `${this.apiParams}${queryParams}`;
  }

  async #fetchOptions() {
    const queryString = this.#buildQuery();

    if (queryString !== this.lastQuery && !this.disabled) {
      this.lastQuery = queryString;

      const [res, data] = await this.#apiManager.GET(queryString);
  
      if (res.ok) {
        this.options = data;
      }
    }
  }
}

customElements.define("mo-select", MoSelect);
