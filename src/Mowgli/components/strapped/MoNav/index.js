import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliSession from "../../../objects/internal/Session";

export default class MoNav extends MoComponent {
  constructor() {
    super(styles, template);
    this.sessionObject = new MowgliSession();
    
    this.authenticated = this.addInternal("authenticated");
    this.addEventListener("closed", this.#resetForm);
    this.addEventListener("submit", this.#submitForm);
  }

  get signInForm() {
    return this.getElementById("sign-in");
  }

  connectedCallback() {
    this.signInForm.appendChild(this.sessionObject.buildForm());
    this.authenticated.state = this.sessionObject.state || false;
  }

  #resetForm() {
    // console.log(event.target);
  }

  async #submitForm() {
    const formData = this.sessionObject.form.values;
    const [res, data] = await this.sessionObject.post("", formData);

    if (res.ok && data) {
      this.authenticated.state = true;
      this.emitEvent(new CustomEvent("mowgli-route-event", {
        detail: "/dashboard",
        bubbles: true,
        cancelable: false,
        composed: true
      }));
    }

    console.log(res.ok, data);
  }
}

customElements.define("mo-nav", MoNav);
