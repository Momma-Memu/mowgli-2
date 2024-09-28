import MoComponent from "../../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSelectedItem extends MoComponent {
  #displayName = this.addAttribute("displayName");

  constructor() {
    super(styles, template);

    this.addListener("click", () => this.#removeSelf());
  }

  get nameEl() {
    return this.shadow.getElementById("display-name");
  }

  get valueId() {
    return this.getAttribute("id");
  }

  set valueId(id) {
    this.setAttribute("id", id);
  }

  get displayName() {
    return this.#displayName.attribute;
  }

  set displayName(value) {
    this.#displayName.attribute = value;
    this.nameEl.innerHTML = this.#displayName.attribute;
  }

  #removeSelf() {
    this.emitEvent(this.createEvent("mo-item-removed", { id: this.valueId, displayName: this.displayName }));
    this.destroySelf();
  }
}
customElements.define("mo-selected-item", MoSelectedItem);
