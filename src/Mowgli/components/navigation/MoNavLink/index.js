import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoNavLink extends MoComponent {
  #active = this.addInternal("active");
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
    const urlParts = window.location.href.split("/");
    return "/" + urlParts[urlParts.length - 1];
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
    
    const destination = event.target.getAttribute("mo-href");
    this.active = false;
    
    this.emitEvent(this.createEvent("mo-route-event", destination));
    this.emitEvent(this.createEvent("mo-route-event-notify-siblings", destination));
  }
}

customElements.define("mo-nav-link", MoNavLink);
