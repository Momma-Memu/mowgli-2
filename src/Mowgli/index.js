import MowgliEvent from "./state/event/index";
import MowgliSession from "./objects/internal/Session";

export default class Mowgli {
  #listener;
  session = new MowgliSession();
  event = new MowgliEvent("get-state", { key: "session" });

  constructor() {
    window.mowgli = this;
    this.#listener = document.createElement("div");
    document.head.appendChild(this.#listener);
    this.#init();
  }

  // #routeHandler() {

  // }

  #init() {
    this.#listener.addEventListener("get-state", (e) => {
      console.log(e, "HELLO!");
    });
  }
}
