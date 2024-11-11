import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoBanner extends MoComponent {
  constructor() {
    super(styles, template);
  }

  static get observedAttributes() {
    return ["mo-title", "mo-description"];
  }

  get title() {
    return this.getElementById("head-title").innerHTML;
  } 

  set title(value) {
    this.getElementById("head-title").innerHTML = value;
  }

  get subtext() {
    return this.getElementById("head-title-subtext");
  } 

  set subtext(value) {
    this.getElementById("head-title-subtext").innerHTML = value;
  }

  attributeChangedCallback(prop, prev, curr) {
    if (prop === "mo-title" && curr !== prev) {
      this.title = curr;
    }

    if (prop === "mo-description"  && curr !== prev) {
      this.subtext = curr;
    }
  }
}

customElements.define("mo-banner", MoBanner);
