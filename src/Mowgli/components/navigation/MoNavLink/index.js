import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoNavLink extends MoComponent {
  #active = this.addInternal("active");
  #moBorderless = this.addAttribute("mo-borderless");
  #href = this.addAttribute("mo-href");

  constructor() {
    super(styles, template);

    this.uniqueID = this.getId;
    this.addListener("click", (event) => this.#route(event));
  }

  get anchorEl() {
    return this.getElementById("anchor");
  }

  get currentURL() {
    return window.location.pathname;
  }

  get active() {
    return this.#active.state;
  }

  set active(state) {
    this.#active.state = state;
  }

  get href() {
    return this.#href.attribute;
  }

  set href(value) {
    this.#href.attribute = value;
  }

  connectedCallback() {
    this.#initState();
  }

  #initState() {
    const anchor = this.anchorEl;

    if (anchor) {
      anchor.setAttribute("href", this.href);
    }

    if (this.href === this.currentURL) {
      this.active = true;
    }
  }

  /** @param {Event} event  */
  #route(event) {
    event.preventDefault();
    
    if (this.currentURL !== this.href) {
      this.active = false;
  
      this.emitEvent(this.createEvent("mo-route-event", this.href));
      this.emitEvent(this.createEvent("mo-route-event-notify-siblings", this.href));
    }
  }
}

customElements.define("mo-nav-link", MoNavLink);
