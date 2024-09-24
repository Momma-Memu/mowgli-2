"use strict";

import MoComponent from "../../index";
import styles from "./index.css?inline";

export default class MoIcon extends MoComponent {
  #iconEl = document.createElement("i");
  #icon = this.addAttribute("mo-fa");

  #animating = this.addInternal("animating");

  constructor() {
    super(styles);

    this.addAttribute("mo-flip-x-clk");
    this.addAttribute("mo-flip-y-clk");
    this.addAttribute("mo-spin-clk");
    this.addAttribute("mo-grow-clk");

    this.addAttribute("mo-flip-hov");
    this.addAttribute("mo-spin-hov");
    this.addAttribute("mo-grow-hov");
    this.addInternal("mo-static");
  }

  get animating() {
    return this.#animating.state;
  }

  set animating(value) {
    this.#animating.state = value;
  }

  connectedCallback() {
    this.#iconEl.setAttribute("class", (this.#icon.attribute || "") + " fa-fw");
    this.shadow.appendChild(this.#iconEl);

    this.addListener("click", () => this.#handleFlip());
  }

  #handleFlip() {
    this.animating = !this.animating;
  }
}

customElements.define("mo-icon", MoIcon);
