import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoBanner extends MoComponent {
  constructor() {
    super(styles, template);
  }

  static get observedAttributes() {
    return ["mo-obj-name", "mo-obj-description"];
  }

  connectedCallback() {
    // const header = this.getElementById("head-text-container");
  }
}

customElements.define("mo-banner", MoBanner);
