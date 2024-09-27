import MowgliObject from "../../index";


export default class MowgliSourceType extends MowgliObject {
  constructor() {
    super("source-options");
    this.#fetchSourceTypes();
  }

  #fetchSourceTypes() {
    // const queryString = this.buildQueryString({
    //   page: 0, 
    //   search: "tot",
    // });

    this.get(`types`);
  }
}
