import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoDropdown extends MoComponent {
  opened = this.addInternal("opened");
  closed = this.addInternal("closed");

  #timeout = null;
  #globalListenerID = "";

  constructor() {
    super(styles, template);

    this.addAttribute("side-bar");
  }

  static get observedAttributes() {
    return ["aria-hidden"];
  }

  get container() {
    return this.getByClass("container");
  }

  connectedCallback() {
    const btn = this.getByClass("dd-btn");

    if (btn) {
      this.addListener("click", () => this.#openClose(), btn);
    }

    this.addListener("click", (event) => this.#checkTarget(event));
  }

  attributeChangedCallback(prop, prev, curr) {
    if (prop === "aria-hidden" && curr !== prev) {
      this.#addRemoveGlobalListener();
    }
  }

  #openClose() {
    clearTimeout(this.#timeout);
    this.opened.state = !this.opened.state;
    this.ariaHidden = this.opened.state;

    if (!this.opened.state) {
      this.#timeout = setTimeout(() => {
        this.closed.state = true;
      }, 500);
    } else {
      this.closed.state = false;
    }
  }

  /** @param {Event} event  */
  #checkTarget({ target }) {
    if (target && target.tagName === "MO-NAV-LINK") {
      this.#openClose();
    }
  }

  /** @param {Event} event  */
  #checkAppTarget(event) {
    event.stopPropagation();

    if (this.opened.state && !event.composedPath().includes(this)) {
      this.#openClose();
    }
  }

  #addRemoveGlobalListener() {
    if (this.opened.state) {
      this.#globalListenerID = this.addListener("click", (event) => this.#checkAppTarget(event), window);
    } else {
      this.removeListener(this.#globalListenerID);
      this.#globalListenerID = "";
    }
  }
}

customElements.define("mo-dropdown", MoDropdown);
