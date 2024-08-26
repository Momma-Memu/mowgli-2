"use strict";

import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoButton extends MoComponent {
  constructor() {
    super(styles, template);

    this.disabled = this.addInternal("disabled");
    this.addAttribute("btn-type");
    this.addAttribute("tabindex");
  }

  connectedCallback() {
    this.addListener("keyup", (event) => this.keyUpHandler(event, "Enter"));
  }
}

customElements.define("mo-button", MoButton);
