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
    this.addListener("click", () => this.#openClose());
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
}

customElements.define("mo-accordian", MoAccordian);
