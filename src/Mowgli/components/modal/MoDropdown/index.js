import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoDropdown extends MoComponent {
  opened = this.addInternal("opened");
  closed = this.addInternal("closed");

  #timeout = null;

  constructor() {
    super(styles, template);

    this.addAttribute("side-bar");
  }

  connectedCallback() {
    const btn = this.getByClass("dd-btn");

    if (btn) {
      this.addListener("click", () => this.#openClose(), btn);
    }
  }

  #openClose() {
    clearTimeout(this.#timeout);
    this.opened.state = !this.opened.state;

    if (!this.opened.state) {
      this.#timeout = setTimeout(() => {
        this.closed.state = true;
      }, 500);
    } else {
      this.closed.state = false;
    }
  }
}

customElements.define("mo-dropdown", MoDropdown);
