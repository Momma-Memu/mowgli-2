import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoAccordian extends MoComponent {
  opened = this.addInternal("opened");
  closed = this.addInternal("closed");

  #timeout = null;

  constructor() {
    super(styles, template);

    this.opened.state = false;
    this.closed.state = true;
  }

  connectedCallback() {
    const btn = this.getByClass("head-container");

    this.addListener("click", () => this.#openClose(), btn);
    // this.addListener("click", (event) => this.#checkTarget(event));
  }

  #openClose() {
    clearTimeout(this.#timeout);
    this.opened.state = !this.opened.state;

    if (!this.opened.state) {
      this.#timeout = setTimeout(() => {
        this.closed.state = true;
      }, 200);
    } else {
      this.closed.state = false;
    }
  }

  /** @param {Event} event  */
  #checkTarget({ target }) {
    console.log(target);

    if (target && target.tagName === "mo-nav-link") {
      console.log(target);
    }
  }
}

customElements.define("mo-accordian", MoAccordian);
