// import MowgliEvent from "./state/event/index";
import MowgliSession from "./objects/internal/Session";
import MoEvent from "./components/utils/MoEvent";

export default class Mowgli {
  #listener;
  session = new MowgliSession();
  // event = this.#createEvent("get-state", { key: "session" });

  constructor() {
    window.mowgli = this;
    this.#listener = document.createElement("div");
    // document.head.appendChild(this.#listener);
    this.#init();
  }

  /** @param {string} url  */
  redirect(url) {
    if (url) {
      window.dispatchEvent(this.#createEvent("mo-route-event", url));
    }
  }

  async #init() {
    // // eslint-disable-next-line no-unused-vars
    // const [response, data] = await this.session.get();
    // if (response.ok && data && window.location.pathname === "/") {
    //   this.redirect("/dashboard");
    // } else if (!data && window.location.pathname !== "/") {
    //   this.redirect("/");
    // }
  }

  #createEvent(name, data) {
    return new MoEvent(name, data);
  }
}
