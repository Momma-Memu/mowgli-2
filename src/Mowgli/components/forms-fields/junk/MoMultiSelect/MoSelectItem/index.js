// import MoComponent from "../../../../index";
// import styles from "./index.css?inline";
// import template from "./index.html?raw";

// export default class MoSelectItem extends MoComponent {
//   #active = this.addInternal("active");
//   #displayName = this.addAttribute("displayName");

//   constructor() {
//     super(styles, template);

//     this.addListener("click", () => this.#updateState());
//   }

//   get nameEl() {
//     return this.shadow.getElementById("display-name");
//   }

//   get valueId() {
//     return this.getAttribute("id");
//   }

//   set valueId(id) {
//     this.setAttribute("id", id);
//   }

//   get displayName() {
//     return this.#displayName.attribute;
//   }

//   set displayName(value) {
//     this.#displayName.attribute = value;
//     this.nameEl.innerHTML = this.#displayName.attribute;
//   }

//   get active() {
//     return this.#active.state;
//   }

//   set active(value) {
//     this.#active.state = value;
//   }

//   #updateState() {
//     this.active = !this.active;
//     this.emitEvent(this.createEvent("mo-item-selected", { id: this.valueId, displayName: this.displayName, state: this.active }));
//   }
// }
// customElements.define("mo-select-item", MoSelectItem);
