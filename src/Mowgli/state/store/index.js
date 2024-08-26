import MowgliCache from "../cache/index";
// import MowgliSession from "../../obj"

export default class MowgliStore {
  #storage = new MowgliCache("store");
  #state = {};

  constructor() {
    const cache = this.#storage.cache;

    if (cache) {
      this.#state = cache;
    } else {
      // TODO: Check access token, and record the authentication state.
    }
  }
}
