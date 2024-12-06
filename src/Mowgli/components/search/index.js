"use strict";

import MoComponent from "../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

import MowgliQueryBuilder from "../../managers/QueryBuilder";

export default class MoSearch extends MoComponent {
  #timeout = this.addTimeout(500);
  #queryBuilder = new MowgliQueryBuilder();

  constructor() {
    super(styles, template);
  }

  get searchField() {
    return this.getElementById("search");
  }

  connectedCallback() {
    this.addListener("field-changed", (e) => this.#handleChange(e), this.searchField);
  }

  #handleChange({ detail }) {
    this.#timeout.sleep(() => {
      this.emitEvent(this.createEvent("search-changed", this.#queryBuilder.buildFromObj({ search: detail })));
    });
  }
}

customElements.define("mo-search", MoSearch);
