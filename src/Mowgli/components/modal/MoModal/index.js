import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoModal extends MoComponent {
  modal = this.shadow.querySelector("#modal");

  #head = this.getSlotByName("head");
  #body = this.getSlotByName("body");

  #openBtn = this.getSlotByName("open-btn");
  #closeBtn = this.getSlotByName("close-btn");
  #submitBtn = this.getSlotByName("submit-btn");
  #deleteBtn = this.getByClass("delete-btn");

  #closeEvent = this.createEvent("closed", null);
  #submitEvent = this.createEvent("submit", null);

  #timeout = null;

  constructor() {
    super(styles, template);
    this.opened = this.addInternal("opened");
    this.closing = this.addInternal("closing");
  }

  static get observedAttributes() {
    return ["modal-name"];
  }

  open() {
    this.opened.state = true;
    this.modal.show();
  }

  close() {
    clearTimeout(this.#timeout);

    this.closing.state = true;
    this.dispatchEvent(this.#closeEvent);

    this.#timeout = setTimeout(() => {
      this.closing.state = false;
      this.opened.state = false;
      this.modal.close();
    }, 300);
  }

  #submit() {
    this.dispatchEvent(this.#submitEvent);
    this.close();
  }

  connectedCallback() {
    this.addListener("click", () => this.open(), this.#openBtn);
    this.addListener("keyup", (event) =>
      this.keyUpHandler(event, "Escape", () => this.close())
    );
    this.addListener("click", () => this.close(), this.#closeBtn);
    this.addListener("click", () => this.#submit(), this.#submitBtn);
  }
}

customElements.define("mo-modal", MoModal);
