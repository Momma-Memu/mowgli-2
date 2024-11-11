import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoPage extends MoComponent {
  constructor() {
    super(styles, template);
  }

  connectedCallback() {
    // const header = this.getElementById("head-text-container");
  }
}

customElements.define("mo-page", MoPage);
